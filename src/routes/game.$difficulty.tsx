import { useEffect, useState } from 'react';
import { useTimer } from 'use-timer';
import { useNavigate, useParams } from 'react-router';
import { Canvas, StatsBar } from '../components';
import { GameResultsRepo } from '../repo';
import { Difficulty, GameBoard, type HandlerArgs } from '../types';
import { type AudioFile, boardGenerator, flagField, useAudioPlayer, visitField } from '../util';

import './game-screen.css';

const getSize = (difficulty: string | undefined) => {
  if (!Object.keys(Difficulty).includes(difficulty ?? '')) {
    return { size: 10, difficulty: Difficulty.EASY };
  }

  return { size: (Number(difficulty) + 1) * 10, difficulty };
};

const getBoard = (rawDifficulty: string | undefined): GameBoard => {
  const { size, difficulty } = getSize(rawDifficulty);
  return boardGenerator(size, Number(difficulty));
};

const GameScreen = () => {
  const { difficulty } = useParams();
  const audioPlayer = useAudioPlayer();
  const navigate = useNavigate();

  const { time, pause: pauseTimer, start } = useTimer();

  const size =getSize(difficulty).size;
  const [gameBoard, setGameBoard] = useState<GameBoard | undefined>(getBoard(difficulty));

  useEffect(() => {
    start();
  }, [start]);

  const endGame = async (path: string, won: boolean, audio: AudioFile): Promise<void> => {
    pauseTimer();

    await audioPlayer[audio]?.play();
    GameResultsRepo.add({
      won,
      size,
      date: new Date(),
      time,
    });
    alert('Game ended. Check table and continue.');
    await navigate(path, { state: { time } });
  };

  const onClick = async ({ pos, isLeftClick }: HandlerArgs): Promise<void> => {
    if (gameBoard && gameBoard.size() > 0) {
      if (gameBoard.at(pos).isBomb && isLeftClick) {
        await endGame('/over', false, 'bomb');
        return;
      }

      let updatedBoard;
      if (isLeftClick) {
        updatedBoard = visitField(pos, gameBoard);
        await audioPlayer.click?.play();
      } else {
        updatedBoard = flagField(pos, gameBoard);
        await audioPlayer.flag?.play();
      }

      setGameBoard(updatedBoard);
      if (updatedBoard?.won()) {
        await endGame('/won', true, 'won');
      }
    }
  };

  return size > 0 ? (
    <div className="game-container">
      <Canvas gameBoard={gameBoard} onClick={onClick} />
      <StatsBar time={time} gameBoard={gameBoard} />
    </div>
  ) : (
    <>
      <div>Loading...</div>
    </>
  );
};

export default GameScreen;

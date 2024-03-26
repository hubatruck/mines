import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTimer } from 'use-timer';
import { Canvas } from './canvas';
import { Difficulty } from '../../types';
import { GameBoard, HandlerArgs } from './game-board/board-types';
import { boardGenerator } from './game-board/board-generator';
import { flagField, visitField } from './game-board/board-visitor';
import { Audio, useAudioPlayer } from './audio-player';
import { StatsBar } from './stats-bar/stats-bar.tsx';
import { useGameResults } from '../../hooks/game-results-hook';

import './game-screen.css';

type GameEndState = {
  path: string;
  won: boolean;
  audio: Audio;
};

export const GameScreen: FC = () => {
  const { difficulty } = useParams();
  const audioPlayer = useAudioPlayer();
  const gameResult = useGameResults();
  const navigate = useNavigate();

  const { time, pause, start } = useTimer();

  const [size, setSize] = useState(-1);
  const [gameBoard, setGameBoard] = useState<undefined | GameBoard>();
  const [gameEndState, setGameEndState] = useState<GameEndState | undefined>();

  useEffect((): void => {
    if (difficulty === undefined) return;
    if (!Object.keys(Difficulty).includes(difficulty ?? '')) {
      setSize(10);
      return;
    }

    const newSize = (Number(difficulty) + 1) * 10;
    setSize(newSize);
    setGameBoard(boardGenerator(newSize, Number(difficulty)));
    start();
  }, [difficulty, start]);

  useEffect((): void => {
    if (gameEndState === undefined) return;

    const { audio, path, won } = gameEndState;

    pause();

    audioPlayer[audio]?.play();
    gameResult.add({
      won,
      size,
      date: new Date(),
      time,
    });
    alert('Game ended. Check table and continue.');
    navigate(path, { state: { time } });
  }, [gameEndState, time, pause]);

  const endGame = useCallback((path: string, won: boolean, audio: Audio): void => {
    setGameEndState({
      won,
      path,
      audio,
    });
  }, []);

  const onClick = useCallback(
    ({ pos, isLeftClick }: HandlerArgs): void => {
      if (gameBoard && gameBoard.size() > 0) {
        if (gameBoard.at(pos).isBomb && isLeftClick) {
          endGame('/over', false, 'bomb');
          return;
        }

        let updatedBoard;
        if (isLeftClick) {
          updatedBoard = visitField(pos, gameBoard);
          audioPlayer.click?.play();
        } else {
          updatedBoard = flagField(pos, gameBoard);
          audioPlayer.flag?.play();
        }

        setGameBoard(updatedBoard);
        if (updatedBoard?.won()) {
          endGame('/won', true, 'won');
        }
      }
    },
    [audioPlayer, gameBoard],
  );

  return size > 0 ? (
    <div className="game-container">
      <Canvas gameBoard={gameBoard} onClick={onClick} />
      <StatsBar time={time} gameBoard={gameBoard} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

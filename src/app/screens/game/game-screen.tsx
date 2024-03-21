import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from './canvas';
import { Difficulty } from '../../types';
import { GameBoard, HandlerArgs } from './game-board/board-types';
import { boardGenerator } from './game-board/board-generator';
import { flagField, visitField } from './game-board/board-visitor';
import { useAudioPlayer } from './audio-player';
import { StatsBar } from './stats-bar/stats-bar.tsx';

import './game-screen.css';

export const GameScreen: FC = () => {
  const { difficulty } = useParams();
  const audioPlayer = useAudioPlayer();
  const navigate = useNavigate();

  const [size, setSize] = useState(-1);
  const [gameBoard, setGameBoard] = useState<undefined | GameBoard>();
  const [gameOver, setGameOver] = useState(false);

  useEffect((): void => {
    if (difficulty === undefined) return;
    if (!Object.keys(Difficulty).includes(difficulty ?? '')) {
      setSize(10);
      return;
    }

    const newSize = (Number(difficulty) + 1) * 10;
    setSize(newSize);
    setGameBoard(boardGenerator(newSize, Number(difficulty)));
  }, [difficulty]);

  const onClick = useCallback(
    ({ pos, isLeftClick }: HandlerArgs): void => {
      if (gameBoard && gameBoard.size() > 0 && !gameOver) {
        if (gameBoard.at(pos).isBomb && isLeftClick) {
          setGameOver(true);
          audioPlayer.bomb?.play();
          alert('game over :c');
          navigate('/over');
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
          setGameOver(true);
          audioPlayer.won?.play();
          alert('done');
          navigate('/won');
        }
      }
    },
    [gameOver, audioPlayer, gameBoard],
  );

  return size > 0 ? (
    <div className="game-container">
      <Canvas gameBoard={gameBoard} onClick={onClick} />
      <StatsBar gameBoard={gameBoard} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

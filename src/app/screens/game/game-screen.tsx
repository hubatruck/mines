import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from './canvas';
import { BOARD_SIZE } from '../../types';
import { GameBoard, Position } from './game-types';
import { fieldGenerator } from './field-generator';
import { visitField } from './field-visitor';

export const GameScreen: FC = () => {
  const { difficulty } = useParams();
  const [size, setSize] = useState(-1);
  const [gameBoard, setGameBoard] = useState<GameBoard>([[]]);

  useEffect((): void => {
    if (difficulty === undefined) return;
    if (!Object.keys(BOARD_SIZE).includes(difficulty ?? '')) {
      setSize(10);
      return;
    }

    const newSize = (Number(difficulty) + 1) * 10;
    setSize(newSize);
    setGameBoard(fieldGenerator(newSize, Number(difficulty)));
  }, [difficulty]);

  const onClick = useCallback(
    (position: Position): void => {
      if (gameBoard[0]?.length > 0) {
        setGameBoard(visitField(position, gameBoard));
      }
    },
    [gameBoard],
  );

  return size > 0 ? <Canvas gameBoard={gameBoard} onClick={onClick} /> : <div>Loading...</div>;
};

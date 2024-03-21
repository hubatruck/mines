import { Difficulty } from '../../../types';
import { FieldState, GameBoard, GameField } from './board-types';
import { everyNeighbour } from './board-util';

const isBomb = (difficulty: Difficulty): boolean => {
  return Math.random() * 100 < difficulty * 5 + 10;
};

export const boardGenerator = (size: number, difficulty: Difficulty): GameBoard => {
  const initialBoard: GameField[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      state: FieldState.HIDDEN,
      isBomb: isBomb(difficulty),
      bombNeighbours: 0,
    })),
  );

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (initialBoard[row][col].isBomb) {
        everyNeighbour({ row, col }, size, ({ row: newRow, col: newCol }): void => {
          initialBoard[newRow][newCol].bombNeighbours++;
        });
      }
    }
  }
  return new GameBoard(initialBoard);
};

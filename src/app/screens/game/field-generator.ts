import { BOARD_SIZE } from '../../types';
import { FieldState, GameBoard } from './game-types';

const isBomb = (difficulty: BOARD_SIZE): boolean => {
  return Math.random() * 100 < difficulty * 5 + 10;
};
export const fieldGenerator = (size: number, difficulty: BOARD_SIZE): GameBoard => {
  const initialBoard = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      state: FieldState.HIDDEN,
      isBomb: isBomb(difficulty),
      bombNeighbours: 0,
    })),
  );

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (initialBoard[row][col].isBomb) {
        [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ].forEach(([offRow, offCol]): void => {
          const newRow = row + offRow;
          const newCol = col + offCol;

          if (newCol >= 0 && newCol < size && newRow >= 0 && newRow < size) {
            initialBoard[newRow][newCol].bombNeighbours++;
          }
        });
      }
    }
  }
  return initialBoard;
};

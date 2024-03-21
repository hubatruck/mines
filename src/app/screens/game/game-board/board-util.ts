import { Position } from './board-types';

export const everyNeighbour = ({ row, col }: Position, size: number, cb: (newPos: Position) => unknown): void => {
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
      cb({ col: newCol, row: newRow });
    }
  });
};

import { FieldState, GameBoard, GameField, Position } from './game-types';

const visitor = ({ row, col }: Position, gameBoard: GameBoard) => {
  const current = gameBoard[row][col];
  current.state = FieldState.VISITED;
  if (current.bombNeighbours > 0 || current.isBomb) return;

  const size = gameBoard.length;
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ].forEach(([offRow, offCol]) => {
    const newRow = row + offRow;
    const newCol = col + offCol;

    if (newCol >= 0 && newCol < size && newRow >= 0 && newRow < size) {
      const neighbour = gameBoard[newRow][newCol];
      if (!(neighbour.isBomb || neighbour.state === FieldState.VISITED)) {
        visitor(
          {
            row: newRow,
            col: newCol,
          },
          gameBoard,
        );
      }
    }
  });
};

export const visitField = (pos: Position, gameBoard: GameBoard) => {
  const boardCopy = gameBoard.map((r: GameField[]): GameField[] => r.slice(0));

  visitor(pos, boardCopy);

  return boardCopy;
};

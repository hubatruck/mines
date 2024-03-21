import { FieldState, GameBoard, GameField, Position } from './board-types';
import { everyNeighbour } from './board-util';

const visitor = (pos: Position, gameBoard: GameBoard): number => {
  const current: GameField = gameBoard.at(pos);
  current.state = FieldState.VISITED;
  if (current.bombNeighbours > 0 || current.isBomb) return 1;

  let visitedCount = 1;
  const size = gameBoard.size();

  everyNeighbour(pos, size, (newPos: Position): void => {
    const neighbour: GameField = gameBoard.at(newPos);

    if (!(neighbour.isBomb || neighbour.state === FieldState.VISITED)) {
      visitedCount += visitor(newPos, gameBoard);
    }
  });
  return visitedCount;
};

export const visitField = (pos: Position, gameBoard: GameBoard | undefined): GameBoard | undefined => {
  const clonedBoard = gameBoard?.clone();
  if (!clonedBoard) return clonedBoard;

  const visitedCount = visitor(pos, clonedBoard);
  clonedBoard.openFields(visitedCount);

  return clonedBoard;
};

export const flagField = (pos: Position, gameBoard: GameBoard | undefined): GameBoard | undefined => {
  const clonedBoard = gameBoard?.clone();
  if (!clonedBoard || clonedBoard.at(pos).state === FieldState.VISITED) {
    return clonedBoard;
  }

  clonedBoard.toggleFlag(pos);

  return clonedBoard;
};

import React from 'react';
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

export const visitField = (pos: Position, gameBoard: React.MutableRefObject<GameBoard | undefined>): void => {
  if (!gameBoard.current) return;
  const visitedCount = visitor(pos, gameBoard.current);
  gameBoard.current.openFields(visitedCount);
};

export const flagField = (pos: Position, gameBoard: React.MutableRefObject<GameBoard | undefined>): void => {
  if (!gameBoard.current || gameBoard.current.at(pos).state === FieldState.VISITED) {
    return;
  }

  const field: GameField = gameBoard.current.at(pos);
  field.state = field.state === FieldState.FLAGGED ? FieldState.HIDDEN : FieldState.FLAGGED;
};

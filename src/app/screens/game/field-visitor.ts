import React from 'react';
import { FieldState, GameBoard, GameField, Position } from './game-types';

const visitor = (pos: Position, gameBoard: GameBoard): number => {
  const { row, col } = pos;

  const current: GameField = gameBoard.at(pos);
  current.state = FieldState.VISITED;
  if (current.bombNeighbours > 0 || current.isBomb) return 1;

  let visitedCount = 1;
  const size = gameBoard.size();
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
      const neighbour = gameBoard.at(newRow, newCol);

      if (!(neighbour.isBomb || neighbour.state === FieldState.VISITED)) {
        visitedCount += visitor(
          {
            row: newRow,
            col: newCol,
          },
          gameBoard,
        );
      }
    }
  });
  return visitedCount;
};

export const visitField = (pos: Position, gameBoard: React.MutableRefObject<GameBoard>): void => {
  const visitedCount = visitor(pos, gameBoard.current);
  gameBoard.current.openFields(visitedCount);
};

export const flagField = (pos: Position, gameBoard: React.MutableRefObject<GameBoard>): void => {
  if (gameBoard.current.at(pos).state === FieldState.VISITED) {
    return;
  }

  const field = gameBoard.current.at(pos);
  field.state = field.state === FieldState.FLAGGED ? FieldState.HIDDEN : FieldState.FLAGGED;
};

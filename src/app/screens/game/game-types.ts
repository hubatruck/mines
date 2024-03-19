export enum FieldState {
  HIDDEN,
  SELECTED,
  FLAGGED,
  VISITED,
}

export type GameField = {
  isBomb: boolean;
  state: FieldState;
  bombNeighbours: number;
};

export type GameBoard = GameField[][];

export type Coordinate = {
  x: number;
  y: number;
};

export type Position = {
  row: number;
  col: number;
};

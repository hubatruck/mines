export enum Difficulty {
  EASY,
  NORMAL,
  HARD,
  EXPERT,
}

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

export type Coordinate = {
  x: number;
  y: number;
};

export type Position = {
  row: number;
  col: number;
};

export type HandlerArgs = {
  pos: Position;
  isLeftClick: boolean;
};

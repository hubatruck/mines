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

export class GameBoard {
  public boardData: GameField[][] = [[]];

  private bombCount: number = 0;

  private remainingFields: number = 0;

  constructor(board: GameField[][]) {
    this.boardData = board;
    this.remainingFields = board.length ** 2;
    this.countBombs();
  }

  public at(pos: Position | number, column?: number): GameField {
    if (typeof pos === 'number') {
      if (column === undefined) throw new Error('Specify column if you are passing direct values');
      return this.boardData[pos][column];
    }
    return this.boardData[pos.row][pos.col];
  }

  public openFields(count: number): void {
    console.log('opened up', count, 'fields. remaining', this.remainingFields - count, '. bomb count', this.bombCount);
    this.remainingFields -= count;
  }

  public won(): boolean {
    return this.remainingFields === this.bombCount;
  }

  public size(): number {
    return this.boardData.length;
  }

  private countBombs(): void {
    this.bombCount = 0;
    for (let row = 0; row < this.size(); row++) {
      for (let col = 0; col < this.size(); col++) {
        this.bombCount += this.boardData[row][col].isBomb ? 1 : 0;
      }
    }
  }
}

export type Coordinate = {
  x: number;
  y: number;
};

export type Position = {
  row: number;
  col: number;
};

export type HandlerArgs = { pos: Position; isLeftClick: boolean };

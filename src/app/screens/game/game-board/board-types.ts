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

  constructor(board: GameField[][], remainingFields?: number) {
    this.cloneBoard(board);
    this.remainingFields = remainingFields ?? board.length ** 2;
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

  public toggleFlag(pos: Position): void {
    const field: GameField = this.at(pos);
    if (field.state === FieldState.FLAGGED) {
      field.state = FieldState.HIDDEN;
    } else {
      field.state = FieldState.FLAGGED;
    }
  }

  public howManyBombs(): number {
    return this.bombCount;
  }

  public countFlags(): number {
    let flags = 0;
    if (this.size() < 2) return flags;
    for (let row = 0; row < this.size(); row++) {
      for (let col = 0; col < this.size(); col++) {
        flags += this.boardData[row][col].state === FieldState.FLAGGED ? 1 : 0;
      }
    }
    return flags;
  }

  public clone(): GameBoard {
    return new GameBoard(this.boardData, this.remainingFields);
  }

  private countBombs(): void {
    this.bombCount = 0;
    if (this.size() < 2) return;
    for (let row = 0; row < this.size(); row++) {
      for (let col = 0; col < this.size(); col++) {
        this.bombCount += this.boardData[row][col].isBomb ? 1 : 0;
      }
    }
  }

  private cloneBoard(board: GameField[][]) {
    this.boardData = Array.from({ length: board.length });

    for (let i = 0; i < board.length; i++) {
      this.boardData[i] = Array.from({ length: board.length });
      for (let j = 0; j < board.length; j++) {
        this.boardData[i][j] = {
          ...board[i][j],
        };
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

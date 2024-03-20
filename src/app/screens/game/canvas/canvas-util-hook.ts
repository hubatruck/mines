import { useCallback } from 'react';
import { Coordinate, FieldState, GameBoard, GameField, Position } from '../game-types';

interface RefObject<T> {
  /**
   * The current value of the ref.
   */
  readonly current: T | null;
}

const getColor = ({ state, isBomb }: GameField): string => {
  if (state === FieldState.FLAGGED) return 'lightgreen';
  if (isBomb && state === FieldState.VISITED) return 'red';
  if (state === FieldState.VISITED) return 'white';
  return 'gray';
};

const getLabel = ({ state, isBomb, bombNeighbours }: GameField): string => {
  if (state === FieldState.VISITED) {
    if (isBomb) return '💣';
    if (bombNeighbours > 0) return String(bombNeighbours);
  }
  if (state === FieldState.FLAGGED) return '🚩';
  return '';
};

export const useCanvasUtil = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const getCellSize = (cellCount: number): { h: number; v: number } => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return { h: -1, v: -1 };

    return { h: canvas.width / cellCount, v: canvas.height / cellCount };
  };

  const drawLines = useCallback((cellCount: number): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!(canvas && ctx)) return;

    const { width, height } = canvas;

    const { h: horizontalSize, v: verticalSize } = getCellSize(cellCount);

    for (let line = 0; line < cellCount + 1; line++) {
      ctx.beginPath();
      ctx.moveTo(0, line * verticalSize);
      ctx.lineTo(width, line * verticalSize);
      ctx.stroke();
    }

    for (let line = 0; line < cellCount + 1; line++) {
      ctx.beginPath();
      ctx.moveTo(line * horizontalSize, 0);
      ctx.lineTo(line * horizontalSize, height);
      ctx.stroke();
    }

    ctx.closePath();
  }, []);

  const fitScreen = useCallback((): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }, []);

  const getClickedCell = ({ x, y, cellCount }: Coordinate & { cellCount: number }): Position => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!(canvas && ctx)) return { row: -1, col: -1 };

    const { left, top } = canvas.getBoundingClientRect();
    const { h: horizontalSize, v: verticalSize } = getCellSize(cellCount);

    const adjustedX = Math.floor((x - left) / horizontalSize);
    const adjustedY = Math.floor((y - top) / verticalSize);

    // ctx?.beginPath();
    // ctx?.rect(adjustedX, adjustedY, 20, 20);
    // ctx?.stroke();
    // ctx?.closePath();

    return { col: adjustedY, row: adjustedX };
  };

  const drawFields = useCallback((gameBoard: GameBoard) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!(canvas && ctx)) return;

    const cellCount = gameBoard.size();

    const { h: horizontalSize, v: verticalSize } = getCellSize(cellCount);

    for (let row = 0; row < cellCount; row++) {
      for (let column = 0; column < cellCount; column++) {
        const field: GameField = gameBoard.at(row, column);

        ctx.beginPath();
        ctx.fillStyle = getColor(field);
        ctx.rect(row * horizontalSize, column * verticalSize, horizontalSize, verticalSize);
        ctx.fill();

        // Text
        const label = getLabel(field);
        if (label.length) {
          const fontSize = Math.min(horizontalSize, verticalSize) * 0.75;
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = 'black';

          const { width: textWidth } = ctx.measureText(label);
          const x = row * horizontalSize - textWidth / 2 + horizontalSize / 2;
          const y = (column + 1) * verticalSize - fontSize / 4;
          ctx.fillText(label, x, y);
        }

        ctx.closePath();
      }
    }
  }, []);

  return {
    drawLines,
    fitScreen,
    getClickedCell,
    drawFields,
  };
};

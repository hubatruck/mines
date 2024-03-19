import { useDebouncedCallback } from 'use-debounce';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { GameBoard, Position } from '../game-types';

import { useCanvasUtil } from './canvas-util-hook';
import './canvas.css';

type Props = {
  onClick: (pos: Position) => unknown;
  gameBoard: GameBoard;
};

export const Canvas: FC<Props> = ({ onClick, gameBoard }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const cu = useCanvasUtil(ref);
  const cellCount = gameBoard.length;

  const reDraw = useCallback((): void => {
    setTimeout((): void => {
      cu.fitScreen();
      cu.drawFields(gameBoard);
      cu.drawLines(cellCount);
    }, 500);
  }, [cellCount, cu.drawLines, cu.fitScreen]);

  const debouncedReDraw = useDebouncedCallback(() => reDraw(), 200);

  useEffect((): void => {
    reDraw();
    console.log(gameBoard);
  }, [gameBoard]);

  const onClickHandler = useCallback((event: React.MouseEvent<HTMLCanvasElement>): void => {
    console.log(event.clientX, event.clientY);
    onClick(cu.getClickedCell({ x: event.clientX, y: event.clientY, cellCount }));
  }, []);

  window.addEventListener('resize', debouncedReDraw);

  return <canvas ref={ref} onClick={onClickHandler} />;
};

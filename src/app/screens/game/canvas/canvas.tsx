import { useDebouncedCallback } from 'use-debounce';
import React, { forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { GameBoard, HandlerArgs } from '../game-board/board-types';

import { useCanvasUtil } from './canvas-util-hook';
import './canvas.css';

type Props = {
  onClick: (args: HandlerArgs) => unknown;
};

export const Canvas = forwardRef<unknown, Props>(({ onClick }, gameBoardRef: unknown) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const cu = useCanvasUtil(ref);

  const gameBoard: MutableRefObject<GameBoard> = useMemo(
    () => gameBoardRef as MutableRefObject<GameBoard>,
    [gameBoardRef],
  );
  const cellCount = useMemo(() => {
    return gameBoard.current && gameBoard.current.size ? gameBoard.current.size() : 0;
  }, []);

  const reDraw = useCallback((): void => {
    setTimeout((): void => {
      cu.fitScreen();
      cu.drawFields(gameBoard?.current);
      cu.drawLines(cellCount);
    }, 10);
  }, [cellCount, cu.drawLines, cu.fitScreen]);

  const debouncedReDraw = useDebouncedCallback(() => reDraw(), 200);

  useEffect((): void => {
    reDraw();
  }, []);

  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
      event.preventDefault();

      onClick({
        pos: cu.getClickedCell({ x: event.clientX, y: event.clientY, cellCount }),
        isLeftClick: event.button === 0,
      });
      reDraw();
    },
    [reDraw],
  );

  window.addEventListener('resize', debouncedReDraw);

  return <canvas ref={ref} onContextMenu={onClickHandler} onClick={onClickHandler} />;
});

Canvas.displayName = 'Canvas';

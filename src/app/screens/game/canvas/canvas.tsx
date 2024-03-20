import { useDebouncedCallback } from 'use-debounce';
import React, { ForwardedRef, forwardRef, MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { GameBoard, HandlerArgs } from '../game-types';

import { useCanvasUtil } from './canvas-util-hook';
import './canvas.css';

type Props = {
  onClick: (args: HandlerArgs) => unknown;
};

export const Canvas = forwardRef<MutableRefObject<GameBoard>, Props>(
  ({ onClick }, gameBoard: ForwardedRef<MutableRefObject<GameBoard>>) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const cu = useCanvasUtil(ref);
    const cellCount = useMemo(() => gameBoard?.current.size(), []);

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
  },
);

Canvas.displayName = 'Canvas';

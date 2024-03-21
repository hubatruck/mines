import { useDebouncedCallback } from 'use-debounce';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { GameBoard, HandlerArgs } from '../game-board/board-types';

import { useCanvasUtil } from './canvas-util-hook';
import './canvas.css';

type Props = {
  onClick: (args: HandlerArgs) => unknown;
  gameBoard: GameBoard | undefined;
};

export const Canvas: FC<Props> = ({ onClick, gameBoard }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const cu = useCanvasUtil(ref);

  const cellCount = useMemo(() => {
    return gameBoard ? gameBoard.size() : 0;
  }, [gameBoard]);

  const reDraw = useCallback((): void => {
    cu.fitScreen();
    cu.drawFields(gameBoard);
    cu.drawLines(cellCount);
  }, [cellCount, cu.drawLines, cu.fitScreen, gameBoard]);

  const debouncedReDraw = useDebouncedCallback(() => reDraw(), 200);

  useEffect((): void => {
    reDraw();
  }, [gameBoard]);

  const onClickHandler = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
      event.preventDefault();

      onClick({
        pos: cu.getClickedCell({ x: event.clientX, y: event.clientY, cellCount }),
        isLeftClick: event.button === 0,
      });
      reDraw();
    },
    [reDraw, cellCount],
  );

  window.addEventListener('resize', debouncedReDraw);

  return (
    <div className="canvas-container">
      <canvas ref={ref} onContextMenu={onClickHandler} onClick={onClickHandler} />
    </div>
  );
};

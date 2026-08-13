import React, { useRef } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import type { HandlerArgs, GameBoard } from '../../types';
import { useCanvasUtil } from './canvas-util-hook';

import './canvas.css';

type Props = {
  onClick: (args: HandlerArgs) => unknown;
  gameBoard: GameBoard | undefined;
};

export const Canvas = ({ onClick, gameBoard }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const cu = useCanvasUtil(ref);

  const cellCount = gameBoard ? gameBoard.size() : 0;

  const reDraw = (): void => {
    cu.fitScreen();
    cu.drawFields(gameBoard);
    cu.drawLines(cellCount);
  };

  const debouncedReDraw = useDebounce(reDraw, 200);

  const onClickHandler = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    event.preventDefault();

    onClick({
      pos: cu.getClickedCell({ x: event.clientX, y: event.clientY, cellCount }),
      isLeftClick: event.button === 0,
    });
    reDraw();
  };

  window.addEventListener('resize', debouncedReDraw);

  return (
    <div className="canvas-container">
      <canvas ref={ref} onContextMenu={onClickHandler} onClick={onClickHandler} />
    </div>
  );
};

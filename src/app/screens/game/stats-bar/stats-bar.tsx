import { forwardRef, MutableRefObject, useMemo } from 'react';
import { GameBoard } from '../game-board/board-types.ts';
import { Canvas } from '../canvas';

import './stats-bar.css';
import { Separator } from './separator.tsx';

export const StatsBar = forwardRef<unknown>(({}, gameBoardRef: unknown) => {
  const gameBoard: MutableRefObject<GameBoard> = useMemo(
    () => gameBoardRef as MutableRefObject<GameBoard>,
    [gameBoardRef],
  );

  return (
    <div className="stats-bar">
      <div>💣 {gameBoard.current.howManyBombs()}</div>
      <Separator />
      <div>⛳ {gameBoard.current.flagsUsed()}</div>
      {/* <button>⛳Flag</button> */}
      {/* <button>🥄Discover</button> */}
    </div>
  );
});

Canvas.displayName = 'StatsBar';

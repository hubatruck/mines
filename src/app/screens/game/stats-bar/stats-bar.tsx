import { FC, useMemo, useState } from 'react';
import { GameBoard } from '../game-board/board-types';

import './stats-bar.css';
import { Separator } from './separator.tsx';

type Props = {
  gameBoard: GameBoard | undefined;
};

export const StatsBar: FC<Props> = ({ gameBoard }) => {
  const [cheater, setCheater] = useState(true);
  const flags = useMemo(() => {
    return gameBoard?.countFlags() ?? '-';
  }, [gameBoard]);

  const showData = useMemo(() => gameBoard && cheater, [gameBoard, cheater]);

  return (
    <div className="stats-bar">
      <div className="stats">
        {showData && (
          <>
            <div>💣 {gameBoard?.howManyBombs() ?? '-'}</div>
            <Separator />
            <div>⛳ {flags}</div>

            {/* <button>⛳Flag</button> */}
            {/* <button>🥄Discover</button> */}
          </>
        )}
      </div>
      <div>
        <input type="checkbox" checked={cheater} id="cheater" onChange={() => setCheater((prev) => !prev)} />
        <label htmlFor="cheater">Cheater</label>
      </div>
    </div>
  );
};

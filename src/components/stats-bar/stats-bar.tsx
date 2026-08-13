import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { GameBoard } from '../../types';
import { Separator } from './separator';

import './stats-bar.css';

type Props = {
  gameBoard: GameBoard | undefined;
  time: number;
};

export const StatsBar = ({ gameBoard, time }: Props) => {
  const navigate = useNavigate();

  const [cheater, setCheater] = useState(false);

  const flags = gameBoard?.countFlags();
  const showData = gameBoard && cheater;

  const onGiveUp = () => {
    if (confirm('All progress will be lost. Are you sure?')) {
      void navigate('/');
    }
  };

  return (
    <div className="stats-bar">
      <span>⏱ {time}s</span>
      <div className="stats">
        {showData && (
          <>
            <div>💣{gameBoard?.howManyBombs() ?? '-'}</div>
            <Separator />
            <div>⛳{flags}</div>

            {/* <button>⛳Flag</button> */}
            {/* <button>🥄Discover</button> */}
          </>
        )}
      </div>
      <div>
        <button onClick={onGiveUp}>Give up</button>
        <input type="checkbox" checked={cheater} id="cheater" onChange={() => setCheater((prev) => !prev)} />
        <label htmlFor="cheater">Cheater</label>
      </div>
    </div>
  );
};

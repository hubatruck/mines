import { FC } from 'react';
import { Result } from '../types/result-types';
import { Difficulty } from '../../../types';

import './results-table.css';

type Props = {
  result: Result;
};

const boardSizeMap = {
  [Difficulty.EASY]: 'Easy (10x10)',
  [Difficulty.NORMAL]: 'Normal (20x20)',
  [Difficulty.EXPERT]: 'Expert',
  [Difficulty.HARD]: 'Hard',
};

export const ResultRow: FC<Props> = ({ result }) => {
  return (
    <tr>
      <td>{result.score}</td>
      <td>{boardSizeMap[result.boardSize]}</td>
      <td>{result.gameTime}s</td>
      <td>{result.date.toDateString()}</td>
    </tr>
  );
};

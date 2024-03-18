import { FC } from 'react';
import { Result } from '../types/result-types';
import { BOARD_SIZE } from '../../../types';

import './results-table.css';

type Props = {
  result: Result;
};

const boardSizeMap = {
  [BOARD_SIZE.EASY]: 'Easy (10x10)',
  [BOARD_SIZE.NORMAL]: 'Normal (20x20)',
  [BOARD_SIZE.EXPERT]: 'Expert',
  [BOARD_SIZE.HARD]: 'Hard',
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

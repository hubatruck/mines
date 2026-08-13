import { useMemo } from 'react';
import type { Result } from '../../types';

import './results-table.css';

type Props = {
  result: Result;
};

const boardSizeMap = (size: number): string => {
  const name = (() => {
    switch (size) {
      case 10:
        return 'Easy';
      case 20:
        return 'Normal';
      case 30:
        return 'Hard';
      case 40:
        return 'Expert';
      default:
        return 'Custom';
    }
  })();
  return `${name} (${size}x${size})`;
};

export const ResultRow = ({ result }: Props) => {
  const score = useMemo(() => {
    const boardSize = (result.size + 1) * 10;
    const score = Math.max(boardSize - result.time * 0.5, 0);

    return result.won ? score : -score * 0.5;
  }, [result]);

  return (
    <tr>
      <td className={result.won ? 'green' : 'red'}>{score}</td>
      <td>{result.won ? 'Won' : 'Lost'}</td>
      <td>{boardSizeMap(result.size)}</td>
      <td>{result.time}s</td>
      <td>{new Date(result.date.toString()).toLocaleString()}</td>
    </tr>
  );
};

import { FC, useMemo } from 'react';

import './results-table.css';
import { Result } from '../../../types/result-types';

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

export const ResultRow: FC<Props> = ({ result }) => {
  const score = useMemo(() => {
    const partialScore = result.size ** 4 - result.time ** 2;
    return result.won ? Math.max(partialScore, 0) : Math.min(-partialScore, 0);
  }, [result]);

  return (
    <tr>
      <td>{score}</td>
      <td>{boardSizeMap(result.size)}</td>
      <td>{result.time}s</td>
      <td>{new Date(result.date.toString()).toLocaleString()}</td>
    </tr>
  );
};

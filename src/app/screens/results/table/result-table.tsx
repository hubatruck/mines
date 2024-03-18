import { FC } from 'react';
import { Result } from '../types/result-types';
import { ResultRow } from './result-row';
import './results-table.css';

type Props = {
  results: Result[];
};

export const ResultTable: FC<Props> = ({ results }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Score</th>
          <th>Board Size</th>
          <th>Game Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <ResultRow key={result.date.toUTCString()} result={result} />
        ))}
      </tbody>
    </table>
  );
};

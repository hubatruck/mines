import { FC } from 'react';
import { ResultRow } from './result-row.tsx';
import './results-table.css';
import { Result } from '../../../types/result-types';

type Props = {
  results: Result[];
};

export const ResultTable: FC<Props> = ({ results }) => {
  return (
    <table className="centered">
      <thead>
        <tr>
          <th>Score</th>
          <th>Board Size</th>
          <th>Game Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result: Result) => (
          <ResultRow key={result.date.toString()} result={result} />
        ))}
      </tbody>
    </table>
  );
};

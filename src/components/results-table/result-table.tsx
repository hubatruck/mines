import type { Result } from '../../types';
import { ResultRow } from './result-row';

import './results-table.css';

type Props = {
  results: Result[];
};

export const ResultTable = ({ results }: Props) => {
  return (
    <table className="centered">
      <thead>
        <tr>
          <th>Score</th>
          <th>Result</th>
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

import { FC, useEffect, useState } from 'react';
import { Result } from './types/result-types';
import { ResultTable } from './table/result-table';
import { AppHeader, HomeButton } from '../../components';
import { BOARD_SIZE } from '../../types';

export const ResultsScreen: FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // setResults(JSON.parse(localStorage.getItem('results') ?? '[]'));
    setResults([{ date: new Date(), boardSize: BOARD_SIZE.EASY, gameTime: 100, score: 100 }]);
  }, []);

  return (
    <>
      <AppHeader subTitle="Results" />
      {results.length ? <ResultTable results={results} /> : <span className="noResults">No results</span>}
      <HomeButton />
    </>
  );
};

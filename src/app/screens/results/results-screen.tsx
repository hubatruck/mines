import { FC, useCallback, useEffect, useState } from 'react';
import { ResultTable } from './table/result-table.tsx';
import { AppHeader, HomeButton } from '../../components';
import { useGameResults } from '../../hooks/game-results-hook';
import { Result } from '../../types/result-types';

export const ResultsScreen: FC = () => {
  const gameResults = useGameResults();

  const [results, setResults] = useState<Result[]>([]);

  useEffect((): void => {
    setResults(gameResults.loadAll);
  }, []);

  const onClear = useCallback((): void => {
    gameResults.clear();
    setResults([]);
  }, [gameResults]);

  return (
    <div className="scrollable">
      <AppHeader subTitle="Results" />
      {results.length ? <ResultTable results={results} /> : <span className="noResults">No results</span>}
      {results.length > 0 && (
        <button type="button" onClick={onClear}>
          Clear
        </button>
      )}
      <HomeButton />
    </div>
  );
};

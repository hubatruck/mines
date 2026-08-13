import { useState } from 'react';
import { AppHeader, HomeButton, ResultTable } from '../components';
import { GameResultsRepo } from '../repo';
import type { Result } from '../types';

const TITLE = 'Results';

const ResultsScreen = () => {
  const [results, setResults] = useState<Result[]>(GameResultsRepo.loadAll());

  const onClear = (): void => {
    if (confirm('This will delete all results. Are you sure?')) {
      GameResultsRepo.clear();
      setResults([]);
    }
  };

  return (
    <div className="scrollable">
      <AppHeader subTitle={TITLE} />
      {results.length ? <ResultTable results={results} /> : <span className="noResults">No results</span>}

      <div className="buttons">
        {results.length > 0 && (
          <button type="button" onClick={onClear}>
            Clear
          </button>
        )}
        <HomeButton />
      </div>
    </div>
  );
};

export default ResultsScreen;

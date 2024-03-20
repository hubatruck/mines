import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader, HomeButton } from '../../components';
import { DifficultySelector } from './difficulty-selector.tsx';
import { Difficulty } from '../../types';

export const NewGameScreen: FC = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

  const onStart = useCallback(() => {
    navigate(`/game/${difficulty}`);
  }, [difficulty]);

  return (
    <div className="centered">
      <AppHeader subTitle="Game setup" />

      <div className="difficulty">
        Difficulty:&nbsp;
        <DifficultySelector onDifficultyChange={(diff) => setDifficulty(diff)} />
      </div>

      <button type="button" onClick={onStart}>
        Start
      </button>

      <HomeButton />
    </div>
  );
};

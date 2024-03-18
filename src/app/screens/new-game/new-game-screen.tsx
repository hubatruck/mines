import { FC, useCallback, useState } from 'react';
import { AppHeader, HomeButton } from '../../components';
import { DifficultySelector } from './difficulty-selector';
import { BOARD_SIZE } from '../../types';
import { useNavigate } from 'react-router-dom';

export const NewGameScreen: FC = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState<BOARD_SIZE>(BOARD_SIZE.EASY);

  const onStart = useCallback(() => {
    navigate(`/game/${difficulty}`);
  }, [difficulty]);

  return (
    <>
      <AppHeader subTitle="Game setup" />

      <div className="difficulty">
        Difficulty:&nbsp;
        <DifficultySelector onDifficultyChange={(diff) => setDifficulty(diff)} />
      </div>

      <button type="button" onClick={onStart}>
        Start
      </button>

      <HomeButton />
    </>
  );
};

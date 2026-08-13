import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Difficulty } from '../types';
import { AppHeader, DifficultySelector, HomeButton } from '../components';

const TITLE = 'Game setup';

const NewGameScreen = () => {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(Difficulty.EASY);

  const onStart = () => {
    void navigate(`/game/${difficulty}`);
  };

  const onDifficultyChange = (difficulty: Difficulty) => setDifficulty(difficulty);

  return (
    <div className="centered">
      <AppHeader subTitle={TITLE} />

      <div className="difficulty">
        Difficulty:&nbsp;
        <DifficultySelector onDifficultyChange={onDifficultyChange} />
      </div>

      <div className="buttons">
        <button type="button" onClick={onStart}>
          Start
        </button>

        <HomeButton />
      </div>
    </div>
  );
};

export default NewGameScreen;

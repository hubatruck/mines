import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Difficulty } from '../../types';

const difficultyMap = {
  [Difficulty.EASY]: 'Easy',
  [Difficulty.EXPERT]: 'Expert',
  [Difficulty.HARD]: 'Hard',
  [Difficulty.NORMAL]: 'Normal',
};

type Props = {
  onDifficultyChange: (difficulty: Difficulty) => unknown;
};

export const DifficultySelector: FC<Props> = ({ onDifficultyChange }) => {
  const [value, setValue] = useState(Difficulty.EASY);

  const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>): void => {
    const castedValue = event.target.value as unknown as Difficulty;
    setValue(castedValue);
    onDifficultyChange(castedValue);
  }, []);

  return (
    <select value={value} onChange={onChange}>
      {Object.keys(difficultyMap).map((key: string) => (
        <option key={key} value={key}>
          {difficultyMap[key as unknown as Difficulty]}
        </option>
      ))}
    </select>
  );
};

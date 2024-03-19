import { ChangeEvent, FC, useCallback, useState } from 'react';
import { BOARD_SIZE } from '../../types';

const difficultyMap = {
  [BOARD_SIZE.EASY]: 'Easy',
  [BOARD_SIZE.EXPERT]: 'Expert',
  [BOARD_SIZE.HARD]: 'Hard',
  [BOARD_SIZE.NORMAL]: 'Normal',
};

type Props = {
  onDifficultyChange: (difficulty: BOARD_SIZE) => any;
};

export const DifficultySelector: FC<Props> = ({ onDifficultyChange }) => {
  const [value, setValue] = useState(BOARD_SIZE.EASY);

  const onChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const castedValue = event.target.value as any as BOARD_SIZE;
    setValue(castedValue);
    onDifficultyChange(castedValue);
  }, []);

  return (
    <select value={value} onChange={onChange}>
      {Object.keys(difficultyMap).map((key) => (
        <option key={key} value={key}>
          {difficultyMap[key as any as BOARD_SIZE]}
        </option>
      ))}
    </select>
  );
};

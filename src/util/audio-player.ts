import { useMemo } from 'react';
import wonSound from '/assets/audio/victory.mp3';
import clickSound from '/assets/audio/click.mp3';
import flagSound from '/assets/audio/flag.mp3';
import bombSound from '/assets/audio/bomb.mp3';

export const useAudioPlayer = () => {
  const click = useMemo(() => new Audio(clickSound), []);
  const won = useMemo(() => new Audio(wonSound), []);
  const flag = useMemo(() => new Audio(flagSound), []);
  const bomb = useMemo(() => new Audio(bombSound), []);

  return {
    click,
    flag,
    bomb,
    won,
  };
};

export type AudioFile = keyof ReturnType<typeof useAudioPlayer>;

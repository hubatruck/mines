import { useEffect, useState } from 'react';
import wonSound from '../../../assets/audio/victory.mp3';
import clickSound from '../../../assets/audio/click.mp3';
import flagSound from '../../../assets/audio/flag.mp3';
import bombSound from '../../../assets/audio/bomb.mp3';

export const useAudioPlayer = () => {
  const [click, setClick] = useState<HTMLAudioElement | undefined>();
  const [won, setWon] = useState<HTMLAudioElement | undefined>();
  const [flag, setFlag] = useState<HTMLAudioElement | undefined>();
  const [bomb, setBomb] = useState<HTMLAudioElement | undefined>();

  useEffect(() => {
    setClick(new Audio(clickSound));
    setBomb(new Audio(bombSound));
    setFlag(new Audio(flagSound));
    setWon(new Audio(wonSound));
  }, []);

  return {
    click,
    flag,
    bomb,
    won,
  };
};

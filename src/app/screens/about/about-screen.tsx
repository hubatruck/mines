import { FC } from 'react';
import './about.css';
import { AppHeader, HomeButton } from '../../components';

type Source = {
  name: string;
  url: string;
};

export const AboutScreen: FC = () => {
  const soundEffects: Source[] = [
    { name: 'Bomb', url: 'https://www.youtube.com/watch?v=BRuk31-CqiA' },
    { name: 'Victory', url: 'https://www.youtube.com/watch?v=a6_R6x5pbpg' },
    { name: 'Others', url: 'https://www.youtube.com/watch?v=fwoAGeUlDCw' },
  ];
  return (
    <>
      <AppHeader subTitle="About" />
      <div>
        <b>Mines: Minesweeper like game, made in React + TypeScript.</b>
        <br />
        <span> Based on the original Java implementation.</span>{' '}
      </div>

      <div>
        <b>&copy; 2021 and 2024 - M. Huba </b>
      </div>

      <div className="sources">
        <span>Sound effect sources: </span>
        <ul>
          {soundEffects.map((source) => (
            <li key={source.name}>
              <span>{source.name}</span>:{' '}
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.url}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <HomeButton />
    </>
  );
};

import { AppHeader, HomeButton } from '../components';

import './about.css';

const TITLE = 'About';

type Source = {
  name: string;
  url: string;
};

const soundEffects: Source[] = [
  { name: 'Bomb', url: 'https://www.youtube.com/watch?v=BRuk31-CqiA' },
  { name: 'Victory', url: 'https://www.youtube.com/watch?v=a6_R6x5pbpg' },
  { name: 'Others', url: 'https://www.youtube.com/watch?v=fwoAGeUlDCw' },
];

const AboutScreen = () => (
  <>
    <AppHeader subTitle={TITLE} />
    <div>
      <b>Mines: Minesweeper like game, made in React + TypeScript.</b>
      <br />
      <span>Based on the original Java implementation.</span>
    </div>

    <div>
      <b>&copy; 2021, 2024 and 2026 - H. </b>
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

export default AboutScreen;

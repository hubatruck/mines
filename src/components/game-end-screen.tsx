import { AppHeader } from './app-header';
import { EndGif } from './end-gif/end-gif';
import { HomeButton } from './home-button';
import { LinkButton } from './link-button';

type Props = {
  title: string;
  time: number;
  won: boolean;
  endMessage: string;
};

export const GameEndContent = ({ title, time, won, endMessage }: Props) => (
  <div className="centered scrollable">
    <AppHeader subTitle={title} />

    <h2>{endMessage.replaceAll('{time}', `${time} second${time > 1 ? 's' : ''}`)}</h2>

    <div className="buttons">
      <LinkButton path="/new">Again</LinkButton>
      <HomeButton />
    </div>

    <EndGif won={won} time={time} />
  </div>
);

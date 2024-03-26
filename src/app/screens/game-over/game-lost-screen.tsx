import { useLocation } from 'react-router-dom';
import { AppHeader, HomeButton, LinkButton } from '../../components';
import { EndGif } from './end-gif/end-gif.tsx';

export const GameLostScreen = () => {
  const {
    state: { time },
  } = useLocation();

  return (
    <div className="centered scrollable">
      <AppHeader subTitle="Game over" />

      <h2>
        You did good for the {time ?? 0} second{time > 1 ? 's' : ''} you played. Kinda.
      </h2>

      <LinkButton path="/new">Again</LinkButton>
      <HomeButton />

      <EndGif won={false} time={time} />
    </div>
  );
};

import { useLocation } from 'react-router-dom';
import { AppHeader, HomeButton, LinkButton } from '../../components';
import { EndGif } from './end-gif/end-gif.tsx';

export const GameWonScreen = () => {
  const {
    state: { time },
  } = useLocation();

  return (
    <div className="centered scrollable">
      <AppHeader subTitle="Game over" />

      <h2>
        You won in a mere {time} second{time > 1 ? 's' : ''}!
      </h2>

      <LinkButton path="/new">Again</LinkButton>
      <HomeButton />

      <EndGif won time={time} />
    </div>
  );
};

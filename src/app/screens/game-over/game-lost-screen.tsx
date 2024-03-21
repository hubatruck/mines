import { Link, useLocation } from 'react-router-dom';
import { AppHeader, HomeButton } from '../../components';

export const GameLostScreen = () => {
  const {
    state: { time },
  } = useLocation();

  return (
    <div className="centered">
      <AppHeader subTitle="Game over" />
      <h2>
        You did good for the {time ?? 0} second{time > 1 ? 's' : ''} you played. Kinda.
      </h2>
      <Link to="/new">
        <button type="button">Again</button>
      </Link>
      <HomeButton />
    </div>
  );
};

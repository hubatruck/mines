import { Link, useLocation } from 'react-router-dom';
import { AppHeader, HomeButton } from '../../components';

export const GameWonScreen = () => {
  const {
    state: { time },
  } = useLocation();
  return (
    <div className="centered">
      <AppHeader subTitle="Game over" />
      <h2>
        You won in a mere {time} second{time > 1 ? 's' : ''}!
      </h2>
      <Link to="/new">
        <button type="button">Again</button>
      </Link>
      <HomeButton />
    </div>
  );
};

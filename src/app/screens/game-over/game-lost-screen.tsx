import { Link } from 'react-router-dom';
import { AppHeader, HomeButton } from '../../components';

export const GameLostScreen = () => {
  return (
    <div className="centered">
      <AppHeader subTitle="Game over" />
      <h2>You did good, kinda</h2>
      <Link to="/new">
        <button type="button">Again</button>
      </Link>
      <HomeButton />
    </div>
  );
};

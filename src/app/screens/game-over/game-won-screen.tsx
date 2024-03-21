import { useLocation } from 'react-router-dom';
import { AppHeader, HomeButton, LinkButton } from '../../components';

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

      <LinkButton path="/new">Again</LinkButton>
      <HomeButton />
    </div>
  );
};

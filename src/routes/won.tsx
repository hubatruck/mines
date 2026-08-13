import { Navigate, useLocation } from 'react-router';
import { GameEndContent } from '../components';
import type { GameEndState } from '../types';

const TITLE = 'Game over';

const GameWonScreen = () => {
  const { state } = useLocation() as GameEndState;

  if (!state?.time) {
    return <Navigate to="/" replace />;
  }

  return <GameEndContent title={TITLE} time={state.time} won endMessage="You won in a mere {time}!" />;
};

export default GameWonScreen;

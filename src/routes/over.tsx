import { Navigate, useLocation } from 'react-router';
import { GameEndContent } from '../components';
import type { GameEndState } from '../types';

const TITLE = 'Game over';

const GameLostScreen = () => {
  const { state } = useLocation() as GameEndState;

  if (!state?.time) {
    return <Navigate to="/" replace />;
  }

  return (
    <GameEndContent
      title={TITLE}
      time={state.time}
      won={false}
      endMessage="You did good for the {time} you played. Kinda."
    />
  );
};

export default GameLostScreen;

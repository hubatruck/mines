import { FC } from 'react';
import { AppHeader, LinkButton } from '../../components';

import './home.css';

export const HomeScreen: FC = () => {
  return (
    <>
      <AppHeader />
      <div className="home">
        <LinkButton path="/new">New Game</LinkButton>
        <LinkButton path="/results">Results</LinkButton>
        <LinkButton path="/about">About</LinkButton>
      </div>
    </>
  );
};

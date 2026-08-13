import { AppHeader, LinkButton } from '../components';

import './home.css';

const HomeScreen = () => {
  return (
    <>
      <AppHeader />
      <div className="home">
        <LinkButton path="/new">New Game</LinkButton>
        <LinkButton path="/results">Results</LinkButton>
        <LinkButton path="/about">About</LinkButton>
      </div>
      <small>
        v{APP_VERSION} ({GIT_COMMIT})
      </small>
    </>
  );
};

export default HomeScreen;

import './App.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutScreen } from './app/screens/about';
import { ResultsScreen } from './app/screens/results';
import { NewGameScreen } from './app/screens/new-game';
import { GameScreen } from './app/screens/game';
import { GameLostScreen, GameWonScreen } from './app/screens/game-over';
import { HomeScreen } from './app/screens/home';

const App = () => {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game/:difficulty" element={<GameScreen />} />
        <Route path="/over" element={<GameLostScreen />} />
        <Route path="/won" element={<GameWonScreen />} />
        <Route path="/new" element={<NewGameScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

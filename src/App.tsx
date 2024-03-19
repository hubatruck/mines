import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutScreen } from './app/screens/about';
import { ResultsScreen } from './app/screens/results';
import { NewGameScreen } from './app/screens/new-game';
import { GameScreen } from './app/screens/game';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/new" />} />
        <Route path="/game/:difficulty" element={<GameScreen />} />
        <Route path="/new" element={<NewGameScreen />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

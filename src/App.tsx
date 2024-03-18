import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutScreen } from './app/screens/about';
import { ResultsScreen } from './app/screens/results';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/results" />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/about" element={<AboutScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

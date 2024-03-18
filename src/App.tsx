import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AboutScreen } from './app/screens/about';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/about" />} />
        <Route path="/about" element={<AboutScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

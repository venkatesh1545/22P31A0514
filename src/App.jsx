// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import RedirectHandler from './routes/RedirectHandler';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

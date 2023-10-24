import { Route, Routes } from 'react-router-dom';
import { Landing, ModeSelectPage, GameOption } from './pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/select-mode" element={<ModeSelectPage />} />
    <Route path="/:mode/game-option" element={<GameOption />} />
  </Routes>
);

export default Router;

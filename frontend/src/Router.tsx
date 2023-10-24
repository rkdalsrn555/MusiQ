import { Route, Routes } from 'react-router-dom';
import {
  Landing,
  ModeSelectPage,
  SingleModePage,
  GameOption,
  GamePlaying,
} from './pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/select-mode" element={<ModeSelectPage />} />
    <Route path="/:mode/game-option" element={<GameOption />} />
    <Route path="/single-mode" element={<SingleModePage />} />
    <Route path="/:mode/game-play" element={<GamePlaying />} />
  </Routes>
);

export default Router;

import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Landing,
  ModeSelectPage,
  SingleModePage,
  GameOption,
  GamePlaying,
  ResultPage,
} from './pages';

const Router = () => (
  <AnimatePresence mode='wait'>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/select-mode" element={<ModeSelectPage />} />
      <Route path="/:mode/game-option" element={<GameOption />} />
      <Route path="/single-mode" element={<SingleModePage />} />
      <Route path="/:mode/game-play" element={<GamePlaying />} />
      <Route path="/:mode/game-result" element={<ResultPage />} />
    </Routes>
  </AnimatePresence>
);

export default Router;

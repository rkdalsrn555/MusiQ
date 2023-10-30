import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BgmBtn } from './components/utils/BgmBtn';
import {
  Landing,
  ModeSelectPage,
  SingleModePage,
  GameOption,
  GamePlaying,
  ResultPage,
  MobilePage,
} from './pages';

const Router = () => {
  const location = useLocation(); // 게임 플레이 페이지를 제외하고 bgm을 재생하기 위한 로직 추가
  const isMusicRoute = !location.pathname.includes('/game-play');

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/select-mode" element={<ModeSelectPage />} />
        <Route path="/:mode/game-option" element={<GameOption />} />
        <Route path="/single-mode" element={<SingleModePage />} />
        <Route path="/:mode/game-play" element={<GamePlaying />} />
        <Route path="/:mode/game-result" element={<ResultPage />} />
        <Route path="/mobile-restriction" element={<MobilePage />} /> 
      </Routes>
      {isMusicRoute && <BgmBtn />}
    </AnimatePresence>
  );
};

export default Router;

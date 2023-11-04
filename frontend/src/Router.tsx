import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoginRouterBtn } from './components/utils';
import { BgmBtn } from './components/utils/BgmBtn';
import {
  Landing,
  ModeSelectPage,
  SingleModePage,
  GameOption,
  GamePlaying,
  ResultPage,
  MobilePage,
  Login,
  RankingPage,
  Signup,
} from './pages';

const Router = () => {
  const location = useLocation(); // 게임 플레이 페이지를 제외하고 bgm을 재생하기 위한 로직 추가
  const isMusicRoute = !location.pathname.includes('/game-play');
  const isLoginRoute = location.pathname.includes('/select-mode');

  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then((res) => {
      const userIp = res.data.IPv4;

      axios
        .post(`${process.env.REACT_APP_BASE_URL}/member/visit`, {
          userIp,
        })
        .then((response) => response)
        .catch((err) => err);
    });
  }, []);

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

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
      {isMusicRoute && <BgmBtn />}
      {/* {isLoginRoute ? <LoginRouterBtn /> : ''} */}
    </AnimatePresence>
  );
};

export default Router;

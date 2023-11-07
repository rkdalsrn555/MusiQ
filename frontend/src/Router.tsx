import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './hooks/PrivateRoute';
import PublicRoute from './hooks/PublicRoute';
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
  MultiGameLobbyPage,
  MzModePage
  } from './pages';

const PrivatePath = [
  { path: '/single-mode', component: <SingleModePage /> },
  { path: '/:mode/game-result', component: <ResultPage /> },
  { path: '/multi/lobby', component: <MultiGameLobbyPage /> },
];

// restricted = false 로그인 여부와 관계없이 접근 가능 페이지
// restricted = true 로그인한 상태에선 접근 불가능: 로그인, 회원가입
const PublicPath = [
  { path: '/login', component: <Login />, restricted: true },
  { path: '/sign-up', component: <Signup />, restricted: true },
  { path: '/guest/game-play', component: <GamePlaying />, restricted: true },
  { path: '/guest/game-option', component: <GameOption />, restricted: true },
  { path: '/', component: <Landing />, restricted: false },
  { path: '/select-mode', component: <ModeSelectPage />, restricted: false },
  { path: '/ranking', component: <RankingPage />, restricted: false },
  { path: '/mobile-restriction', component: <MobilePage />, restricted: false },
  { path: '/mz-mode', component: <MzModePage />},
];

const Router = () => {
  const location = useLocation(); // 게임 플레이 페이지를 제외하고 bgm을 재생하기 위한 로직 추가
  const isMusicRoute = !location.pathname.includes('/game-play');
  const userAccessToken = window.localStorage.getItem('userAccessToken');

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
      <Routes key={0}>
        {PrivatePath.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <PrivateRoute
                component={item.component}
                authenticated={userAccessToken}
              />
            }
          />
        ))}

        {PublicPath.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <PublicRoute
                authenticated={!userAccessToken}
                restricted={item.restricted}
                component={item.component}
              />
            }
          />
        ))}
      </Routes>
      {isMusicRoute && <BgmBtn key={1} />}
    </AnimatePresence>
  );
};

export default Router;

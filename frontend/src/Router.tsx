import { Route, Routes } from 'react-router-dom';
import PublicRoute from './hooks/PublicRoute';
import { Landing, ModeSelectPage } from './pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/select-mode" element={<ModeSelectPage />} />
  </Routes>
);

export default Router;

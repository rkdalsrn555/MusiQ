import { Route, Routes } from 'react-router-dom';
import PublicRoute from './hooks/PublicRoute';
import { Landing, ModeSelectPage, SingleModePage } from './pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/select-mode" element={<ModeSelectPage />} />
    <Route path="/single-mode" element={<SingleModePage />} />
  </Routes>
);

export default Router;

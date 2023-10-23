import { Route, Routes } from 'react-router-dom';
import PublicRoute from './hooks/PublicRoute';
import { Landing } from './pages';

const Router = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
  </Routes>
);

export default Router;

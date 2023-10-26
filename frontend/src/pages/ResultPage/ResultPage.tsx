import { FC } from 'react';
import { ResultInfo } from '../../components/features/Result/ResultInfo/ResultInfo';
import { HomeBtn } from '../../components/utils/HomeBtn/HomeBtn';

export const ResultPage: FC = () => (
  <div>
    <HomeBtn url="/" />;
    <ResultInfo />
  </div>
);

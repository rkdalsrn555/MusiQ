import { FC } from 'react';
import { motion } from 'framer-motion';
import { ResultInfo } from '../../components/features/Result/ResultInfo/ResultInfo';
import { HomeBtn } from '../../components/utils/HomeBtn/HomeBtn';

export const ResultPage: FC = () => (
  <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
    <HomeBtn url="/" />;
    <ResultInfo />
  </motion.div>
);

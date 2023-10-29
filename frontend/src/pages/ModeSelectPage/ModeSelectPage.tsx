import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  ModeSelectBackground,
  StyledLogo,
  LogoContainer,
} from './ModeSelectPage.styled';
import { ModeSelectCarousel } from '../../components/features';
import { BackBtn } from '../../components/utils/BackBtn/BackBtn';
import LogoIcon from '../../assets/svgs/logo.svg';

export const ModeSelectPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <LogoContainer>
      <StyledLogo src={LogoIcon} alt="Logo" />
    </LogoContainer>
    <ModeSelectBackground>
      <BackBtn url="/" />
      <ModeSelectCarousel />
    </ModeSelectBackground>
  </motion.div>
);

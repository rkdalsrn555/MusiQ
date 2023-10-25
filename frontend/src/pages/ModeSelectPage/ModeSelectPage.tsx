import styled from 'styled-components';
import {
  ModeSelectBackground,
  StyledLogo,
  LogoContainer,
} from './ModeSelectPage.styled';
import { ModeSelectCarousel } from '../../components/features';
import { BackBtn } from '../../components/utils/BackBtn/BackBtn';
import LogoIcon from '../../assets/svgs/logo.svg';

export const ModeSelectPage = () => (
  <>
    <LogoContainer>
      <StyledLogo src={LogoIcon} alt="Logo" />
    </LogoContainer>
    <ModeSelectBackground>
      <BackBtn url="/" />
      <ModeSelectCarousel />
    </ModeSelectBackground>
  </>
);

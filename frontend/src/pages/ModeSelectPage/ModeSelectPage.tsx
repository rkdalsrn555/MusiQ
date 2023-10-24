import styled from 'styled-components';
import { ModeSelectBackground, } from './ModeSelectPage.styled';
import { Logo } from '../../components/utils/Logo/Logo';
import { ModeSelectCarousel } from '../../components/features';
import { BackBtn } from '../../components/utils/BackBtn/BackBtn';

export const ModeSelectPage = () => (
  <ModeSelectBackground>
    <BackBtn url="/" />
    <Logo size="sm" />
    <ModeSelectCarousel />
  </ModeSelectBackground>
);

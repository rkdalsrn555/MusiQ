import { Logo } from '../../components/utils/Logo/Logo';
import { ModeSelectCarousel } from '../../components/features';
import { ModeSelectBackground } from './ModeSelectPage.styled';

export const ModeSelectPage = () => (
  <ModeSelectBackground>
    <Logo size="sm" />
    <ModeSelectCarousel />
  </ModeSelectBackground>
);

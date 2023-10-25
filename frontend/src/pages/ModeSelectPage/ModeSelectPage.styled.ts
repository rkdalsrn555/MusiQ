import styled from 'styled-components';
import { Logo } from '../../components/utils/Logo/Logo';

export const ModeSelectBackground = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 25vh; /* viewport height를 사용하여 화면 높이에 맞춤 */
  width: 100%; /* 화면 너비에 맞게 설정 */
`;

export const StyledLogo = styled.img`
  width: 200px; /* 로고의 너비 설정 */
  max-width: 100%; /* 반응형을 위해 max-width 설정 */
`;


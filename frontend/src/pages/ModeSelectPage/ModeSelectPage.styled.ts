import styled from 'styled-components';
import waterBackground from '../../assets/img/background/waterBackground.gif';

export const ModeSelectBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${waterBackground});
  background-size: cover; 
  background-repeat: no-repeat; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

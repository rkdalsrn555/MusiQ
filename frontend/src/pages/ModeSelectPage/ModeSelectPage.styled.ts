import styled from 'styled-components';
import waterBackground from '../../assets/img/background/waterBackground.gif'; // GIF의 경로를 올바르게 설정하세요.

export const ModeSelectBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${waterBackground});
  background-size: cover; // 배경 이미지가 컨테이너에 꽉 차게 설정
  background-repeat: no-repeat; // 이미지가 반복되지 않도록 설정
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

import styled from 'styled-components';
import backgroundGif2 from '../../assets/img/background/backgroundGif1.gif';

export const LobbyWrapper = styled.div`
  width: 95vw;
  min-width: 100rem;
  height: 93vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.4);
  margin: auto;
  margin-top: 2%;
`;

export const MulitBackGround = styled.div`
  width: 100vw;
  height: 100vh;
  line-height: 1;
  overflow: hidden;
  background-image: url(${backgroundGif2});
  background-size: cover;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const ButtonsWrapper = styled.div`
  width: 11vw;
  height: 41vh;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  right: 4.5%;
  top: 14%;
`;

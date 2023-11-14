import styled from 'styled-components';
import backgroundGif1 from '../../assets/img/background/backgroundGif1.gif';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundGif1});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const topPosition = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-top: 5%;
`;

export const middlePosition = styled.div`
  width: fit-content;
  padding: 0.5rem;
  margin: 0 auto;
  background-color: black;
  color: #fff;
`;

export const bottomPosition = styled.div`
  margin: 0 auto;
  margin-bottom: 1%;
`;

export const ExplainBox = styled.div`
  padding: 1rem;
  width: 30rem;
  height: 20rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 3px solid rgba(255, 255, 255, 0.6);

  & .waitingBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    & .waiting {
      margin-top: 2rem;
      font-size: 2rem;
      font-family: 'Galmuri11', 'sans-serif';
    }
  }
`;

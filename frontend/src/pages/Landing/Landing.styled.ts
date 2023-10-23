import styled from 'styled-components';
import backgroundGif1 from '../../assets/img/background/backgroundGif1.gif';

export const LandingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundGif1});
  background-size: cover;
  object-fit: cover;
  object-position: 50% 50%;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  & h1 {
    font-size: 3rem;
    color: #fff;
  }

  & button {
    display: block;
    font-size: 2.5rem;
    color: #fff509;
    font-weight: bold;
    text-decoration: underline;
  }

  & p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoginContainer = styled.div`
  width: 35rem;
  height: 48rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: center;

  & h1 {
    font-size: 2.5rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }
`;

export const LogoContainer = styled.div`
  width: 300px;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 10px;
  text-align: center;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const signupText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #444b59;

  & .link {
    color: #fcff5d;
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
    text-underline-position: under;
    margin-left: 16px;
  }
`;

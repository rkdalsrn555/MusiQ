import styled from 'styled-components';

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const LoginWrapper = styled.div`
  width: 35rem;
  height: 35rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.4);

  & h1 {
    font-size: 2.5rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }
`;

export const signupText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #444b59;

  & .link {
    color: #8699da;
    text-decoration: underline;
    text-underline-position: under;
    margin-left: 16px;
  }
`;

export const LogoContainer = styled.div`
  margin: 0 auto;
`;

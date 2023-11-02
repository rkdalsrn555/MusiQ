import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactComponent as KeyLogo } from '../../../../assets/svgs/login/loginKey.svg';

const Container = styled.div`
  position: absolute;
  top: 4%;
  right: 10%;
  display: flex;
  align-items: center;
  gap: 0.7rem;

  & p {
    font-size: 2rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  &:hover {
    & .keyLogo {
      fill: #ffe500;
      transition: all 0.5s;
    }

    & p {
      color: #ffe500;
      transition: all 0.5s;
    }
  }
`;
export const LoginRouterBtn = () => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate('/login');
      }}
    >
      <KeyLogo className="keyLogo" width={50} />
      <p>Login</p>
    </Container>
  );
};

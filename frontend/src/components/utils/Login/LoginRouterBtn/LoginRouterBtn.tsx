import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as KeyLogo } from '../../../../assets/svgs/login/loginKey.svg';
import hoverCursorIcon from '../../../../assets/img/hoverCursorIcon.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-top: 0.5rem;
  padding-right: 8rem;

  & p {
    font-size: 2rem;
    font-family: 'Galmuri11', sans-serif;
    font-weight: bold;
  }

  :hover,
  :active {
    cursor:
      url(${hoverCursorIcon}) 2 2,
      auto !important;
  }

  &:hover {
    & .keyLogo {
      fill: #ffe500;
      transition: all 0.3s;

      :hover,
      :active {
        cursor:
          url(${hoverCursorIcon}) 2 2,
          auto !important;
      }
    }

    & p {
      color: #ffe500;
      transition: all 0.3s;

      :hover,
      :active {
        cursor:
          url(${hoverCursorIcon}) 2 2,
          auto !important;
      }
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

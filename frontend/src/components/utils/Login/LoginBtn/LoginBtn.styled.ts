import styled from 'styled-components';
import LoginBtnPng from '../../../../assets/img/Login/loginBtn.png';
import clickLoginBtn from '../../../../assets/img/Login/clickLoginBtn.png';

export const LoginButtonContainer = styled.button<{ isDisabled: boolean }>`
  width: 400px;
  height: 72px;
  background-image: url(${LoginBtnPng});
  background-size: cover;

  &:active {
    background-image: url(${clickLoginBtn});
    background-position: 0;
  }
`;

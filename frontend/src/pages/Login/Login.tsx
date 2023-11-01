/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Modal,
  LoginBtn,
  LoginInput,
  Logo,
  BackBtn,
} from '../../components/utils';
import * as S from './Login.styled';

export const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const [isToggled, setIsToggled] = useState<boolean>(false); // 모달 창 toggle
  const [modalData, setModalData] = useState<{
    data: {
      title: string;
      message: string;
    };
    noBtnClick?: () => void | null;
    yesBtnClick?: () => void | null;
  }>({ data: { title: '', message: '' } });

  const getLogin = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
        userId,
        pw,
      })
      .then((res) => {
        window.localStorage.setItem('userAccessToken', res.data.accessToken);
        window.localStorage.setItem('userRefreshToken', res.data.refreshToken);
        navigate('/select-mode');
      })
      .catch((err) => {
        setIsToggled(true);
        setModalData({
          data: {
            title: '😥',
            message: '아이디나 비밀번호가 일치하지 않습니다',
          },
          yesBtnClick: () => {
            setIsToggled(false);
          },
        });
        setUserId('');
        setPw('');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <BackBtn url="/select-mode" />
      <Modal {...modalData} isToggled={isToggled} setIsToggled={setIsToggled} />
      <S.LoginContainer>
        <S.LogoContainer>
          <Logo size="sm" />
        </S.LogoContainer>
        <S.LoginWrapper>
          <h1>Login</h1>
          <LoginInput
            labelId="userId"
            labelContent="아이디"
            placeholder=""
            inputValue={userId}
            setInputValue={setUserId}
          />
          <LoginInput
            labelId="userPwd"
            labelContent="비밀번호"
            inputValue={pw}
            setInputValue={setPw}
          />

          <LoginBtn
            content="로그인"
            isDisabled={false}
            handleClick={getLogin}
          />

          <S.signupText>
            계정이 없으시다면,
            <Link to="/sign-up" className="link">
              회원가입
            </Link>
          </S.signupText>
        </S.LoginWrapper>
      </S.LoginContainer>
    </motion.div>
  );
};

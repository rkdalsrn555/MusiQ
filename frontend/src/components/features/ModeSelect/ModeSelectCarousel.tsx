import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  Box,
  ButtonContainer,
  RotatedImage,
  StyledImage,
} from './ModeSelect.styled';
import nextButton from '../../../assets/svgs/buttonSvgs/nextButton.svg';
import EnterButton from '../../../assets/svgs/buttonSvgs/Enter.svg';
import singleModeChar from '../../../assets/img/modeSelect/singleMode.png';
import multiModeChar from '../../../assets/img/modeSelect/multiMode.png';
import guestModeChar from '../../../assets/img/modeSelect/guestMode.png';
import mzModeChar from '../../../assets/img/modeSelect/mzMode.png';

export const ModeSelectCarousel: React.FC = () => {
  const [visible, setVisible] = useState<number>(0);
  const [back, setBack] = useState<boolean>(false);
  const navigate = useNavigate();
  const [lastInputTime, setLastInputTime] = useState<number>(0);
  const INPUT_INTERVAL = 350; // ms

  const contents = [
    // 박스 안에 넣을 텍스트, 이미지, 그리고 엔터 누르면 라우팅 될 링크를 설정!
    {
      text: '',
      image: singleModeChar,
      link: '/single/game-option',
    },
    { text: '', image: guestModeChar, link: '/guest/game-option' },
    { text: '', image: multiModeChar, link: '/multi-mode' },
    { text: '', image: mzModeChar, link: '/mz-mode' },
  ];

  const navigateToLink = () => {
    navigate(contents[visible].link);
  };

  const nextPlease = (): void => {
    setBack(false);
    if (visible < contents.length - 1) {
      setVisible((prev) => prev + 1);
    }
  };

  const prevPlease = (): void => {
    setBack(true);
    if (visible > 0) {
      setVisible((prev) => prev - 1);
    }
  };

  const handleButtonClick = (action: () => void) => {
    const now = Date.now();
    if (now - lastInputTime < INPUT_INTERVAL) return;
    setLastInputTime(now);
    action();
  };

  useEffect(() => {
    // 키보드로 조작할 수 있도록 로직 추가
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastInputTime < INPUT_INTERVAL) return;

      setLastInputTime(now);

      switch (event.code) {
        case 'ArrowLeft':
          prevPlease();
          break;
        case 'Enter':
          navigateToLink();
          break;
        case 'ArrowRight':
          nextPlease();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  const boxVariants = {
    // 박스 애니메이션
    entry: (isBack: boolean) => ({
      opacity: 0,
      scale: 0,
      x: isBack ? -500 : 500,
    }),
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.3 } },
    exit: (isBack: boolean) => ({
      opacity: 0,
      scale: 0,
      x: isBack ? 500 : -500,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          custom={back}
          key={visible.toString()}
          variants={boxVariants}
          initial="entry"
          animate="visible"
          exit="exit"
        >
          <StyledImage
            src={contents[visible].image}
            alt={contents[visible].text}
          />
          <p>{contents[visible].text}</p>
        </Box>
      </AnimatePresence>
      <ButtonContainer>
        <button
          type="button"
          onClick={() => handleButtonClick(prevPlease)}
          style={{
            fontSize: '30px',
            visibility: visible > 0 ? 'visible' : 'hidden', // 이전 컨텐츠가 없다면 버튼 숨겨서 오류 발생 막자
          }}
        >
          <RotatedImage src={nextButton} alt="prevButton" />
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick(navigateToLink)}
          style={{ fontSize: '30px' }}
        >
          <img src={EnterButton} alt="enterButton" />
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick(nextPlease)}
          style={{
            fontSize: '30px',
            visibility: visible < contents.length - 1 ? 'visible' : 'hidden', // 다음 컨텐츠가 없다면 버튼 숨겨서 오류 막자
          }}
        >
          <img src={nextButton} alt="nexButton" />
        </button>
      </ButtonContainer>
    </Wrapper>
  );
};

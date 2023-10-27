import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  ButtonContainer,
  RotatedImage,
  StyledImage,
} from './ModeSelect.styled';
import nextButton from '../../../assets/svgs/modeSelectSvgs/nextButton.svg';
import EnterButton from '../../../assets/svgs/modeSelectSvgs/Enter.svg';
import singleModeChar from '../../../assets/img/modeSelect/singleMode.png';
import multiModeChar from '../../../assets/img/modeSelect/multiMode.png';
import guestModeChar from '../../../assets/img/modeSelect/guestMode.png';
import mzModeChar from '../../../assets/img/modeSelect/mzMode.png';

export const ModeSelectCarousel: React.FC = () => {
  const [visible, setVisible] = useState<number>(0);
  const [back, setBack] = useState<boolean>(false);
  const navigate = useNavigate();
  const [lastInputTime, setLastInputTime] = useState<number>(0); // 키보드, 마우스 연타 방지용으로 시간 측정
  const INPUT_INTERVAL = 350; // ms

  const contents = [
    // 박스 안에 넣을 텍스트, 이미지, 그리고 엔터 누르면 라우팅 될 링크를 설정!
    {
      id: 1,
      text: '',
      image: singleModeChar,
      link: '/single/game-option',
    },
    { id: 2, text: '', image: guestModeChar, link: '/guest/game-option' },
    { id: 3, text: '', image: multiModeChar, link: '/multi-mode' },
    { id: 4, text: '', image: mzModeChar, link: '/mz-mode' },
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
    if (now - lastInputTime < INPUT_INTERVAL) return; // 마우스 연타 막기
    setLastInputTime(now);
    action();
  };

  useEffect(() => {
    // 키보드로 조작할 수 있도록 로직 추가
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastInputTime < INPUT_INTERVAL) return; // 키보드 연타 막기

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

  return (
    <>
      <AnimatePresence initial={false}>
        {contents.map((content, index) => {
          let position;
          let zIndexValue;
          let opacityValue;
          let scaleValue;
          let initialPosition;

          if (index === visible) {
            position = '0%';
            zIndexValue = 2;
            opacityValue = 1;
            scaleValue = 1;
            initialPosition = back ? '-80%' : '80%';
          } else if (index === visible - 1) {
            position = '-80%';
            zIndexValue = 1;
            opacityValue = 0.5;
            scaleValue = 0.8;
            initialPosition = '-80%';
          } else if (index === visible + 1) {
            position = '80%';
            zIndexValue = 1;
            opacityValue = 0.5;
            scaleValue = 0.8;
            initialPosition = '80%';
          } else {
            return null;
          }

          return (
            <Box
              key={content.id}
              initial={{
                x: initialPosition,
                zIndex: 1,
                opacity: 0.5,
                scale: 0.8,
              }}
              animate={{
                x: position,
                zIndex: zIndexValue,
                opacity: opacityValue,
                scale: scaleValue,
              }}
              exit={{
                x: back ? '80%' : '-80%',
                zIndex: 1,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              <StyledImage src={content.image} alt={content.text} />
            </Box>
          );
        })}
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
    </>
  );
};

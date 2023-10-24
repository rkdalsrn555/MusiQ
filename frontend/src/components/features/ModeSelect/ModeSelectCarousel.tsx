import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  Box,
  ButtonContainer,
  RotatedImage,
} from './ModeSelect.styled';
import nextButton from '../../../assets/svgs/buttonSvgs/nextButton.svg';
import EnterButton from '../../../assets/svgs/buttonSvgs/Enter.svg';

export const ModeSelectCarousel: React.FC = () => {
  const [visible, setVisible] = useState<number>(0);
  const [back, setBack] = useState<boolean>(false);
  const navigate = useNavigate();

  const contents = [
    {
      text: 'Single Mode',
      image: 'path_to_image1',
      link: '/single/game-option',
    }, // 넣을 텍스트, 이미지, 라우팅 될 링크를 설정해주자
    { text: 'Text 2', image: 'path_to_image2', link: '/guest/game-option' },
    { text: 'Text 3', image: 'path_to_image2', link: '/multi-mode' },
    { text: 'Text 4', image: 'path_to_image2', link: '/mz-mode' },
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

  useEffect(() => {
    // 키보드로 조작할 수 있도록 로직 추가
    const handleKeyDown = (event: KeyboardEvent) => {
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
          <img src={contents[visible].image} alt={contents[visible].text} />
          <p>{contents[visible].text}</p>
        </Box>
      </AnimatePresence>
      <ButtonContainer>
        {visible > 0 && (
          <button
            type="button"
            onClick={prevPlease}
            style={{ fontSize: '30px' }}
          >
            <RotatedImage src={nextButton} alt="prevButton" />
          </button>
        )}
        <button
          type="button"
          onClick={navigateToLink}
          style={{ fontSize: '30px', alignSelf: 'center' }}
        >
          <img src={EnterButton} alt="enterButton" />
        </button>
        {visible < contents.length - 1 && (
          <button
            type="button"
            onClick={nextPlease}
            style={{ fontSize: '30px' }}
          >
            <img src={nextButton} alt="nexButton" />
          </button>
        )}
      </ButtonContainer>
    </Wrapper>
  );
};

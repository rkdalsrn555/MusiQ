import { motion, AnimatePresence } from 'framer-motion';
import { FC, useState } from 'react';
import { Wrapper, Box } from './ModeSelect.styled';

export const ModeSelectCarousel: FC = () => {
  const [visible, setVisible] = useState<number>(1);
  const [back, setBack] = useState<boolean>(false);

  const nextPlease = (): void => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };

  const prevPlease = (): void => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

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
          {visible}
        </Box>
      </AnimatePresence>
      <button type="button" onClick={nextPlease} style={{ fontSize: '30px' }}>
        next
      </button>
      <button type="button" onClick={prevPlease} style={{ fontSize: '30px' }}>
        prev
      </button>
    </Wrapper>
  );
};

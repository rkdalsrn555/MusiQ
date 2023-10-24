import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

export const Box = styled(motion.div)`
width: 400px;
height: 200px;
background-color: rgba(255, 255, 255, 1);
border-radius: 40px;
position: absolute;
top: 150px;
display: flex;
justify-content: center;
align-items: center;
font-size: 28px;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
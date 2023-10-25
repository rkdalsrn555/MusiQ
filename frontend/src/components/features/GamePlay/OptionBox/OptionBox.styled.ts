import styled from 'styled-components';

export const Container = styled.div`
  width: 15rem;
  padding: 2rem 3rem;
  background-color: rgba(255, 255, 255, 0.7);
  text-align: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  & p {
    font-size: 1.5rem;
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  gap: 4rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: max-content;

  & li {
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
  }

  & li:nth-child(1) {
    padding-bottom: 8rem;
  }

  & li:nth-child(2) {
    padding-bottom: 15rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: max-content;
  gap: 5rem;
`;

import styled from 'styled-components';

export const CenteredContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
`;

export const RankingWrapper = styled.div`
  width: 45rem;
  height: 38rem;
  flex-shrink: 0;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.4); 
  flex-direction: column;
`;

export const RankingItemsWrapper = styled.div`
  width: 38rem;
  height: 30rem;
  border: solid 5px rgba(235, 226, 255, 0.4);
  border-radius: 2px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: whitesmoke;
  }
`

export const RankingLogoImg = styled.img`
  display: flex;
  margin-bottom: 1.5%;
`

export const RankingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f8f8; 
  border-bottom: 2px solid #eee; 
  width: 38rem;
  border-radius: 2px;
`;

export const HeaderCell = styled.div`
  font-weight: bold;
  font-size: large;
  color: red;
  flex-basis: 33.33%; 
  text-align: center;
`;


export const RankingItem = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee; 
`

export const Cell = styled.div`
  flex-basis: 33.33%; 
  text-align: center;
`;

export const RankingContainer = styled.div`
  width: 38rem;
`;


import React from 'react';
import refreshIcon from '../../../../assets/svgs/MultiLobby/refreshButton.svg';
import { StyledRefreshButton } from './RefreshButton.styled';

interface RefreshButtonProps {
  onClick: () => void;
}

export const RefreshButton = ({ onClick }: RefreshButtonProps) => (
  <StyledRefreshButton type="button" onClick={onClick}>
    <img src={refreshIcon} alt="refresh button" width={160} />
  </StyledRefreshButton>
);

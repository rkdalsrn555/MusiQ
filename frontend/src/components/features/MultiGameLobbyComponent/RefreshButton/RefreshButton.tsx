import React from 'react';
import refreshIcon from '../../../../assets/svgs/MultiLobby/refreshButton.svg';
import { StyledRefreshButton } from './RefreshButton.styled';

export const RefreshButton = () => (
  <StyledRefreshButton type="button">
    <img src={refreshIcon} alt="refresh button" width={160} />
  </StyledRefreshButton>
);

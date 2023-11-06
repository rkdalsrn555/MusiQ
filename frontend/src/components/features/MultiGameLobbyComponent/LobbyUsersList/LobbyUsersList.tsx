import React, { useState } from 'react';
import styled from 'styled-components';
import { UsersListWrapper, UserCell, UserCellWrapper } from './LobbyUsersList.styled';

export const LobbyUsersList = () => {
  // 더미 데이터
  const dummyUsers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `User${index + 1}`
  }));

  const [users, setUsers] = useState(dummyUsers);

  return (
    <UsersListWrapper>
      <UserCellWrapper> 
      {users.map(user => (
        // 각 유저별로 고유한 key를 할당합니다.
        <UserCell key={user.id}>{user.name}</UserCell>
      ))}
      </UserCellWrapper>
    </UsersListWrapper>
  );
};

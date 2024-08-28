import { useDaoMembers } from '@daohaus/moloch-v3-hooks';
import { ProfileAvatar } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';

const AvatarListWrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.bgColor};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;



const ProfileAvatarList: React.FC = () => {

  const {members} = useDaoMembers();
  
  return (
    <AvatarListWrapper>
      {members.length === 0 && <p>None yet</p>}
      {members.map((member, index) => (
        <AvatarWrapper key={index}>
          <ProfileAvatar address={member.memberAddress} alt="thing" />
        </AvatarWrapper>
      ))}
    </AvatarListWrapper>
  );
};

export default ProfileAvatarList;
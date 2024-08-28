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

interface AvatarListProps {
  assets: string[];
}

const AvatarList: React.FC<AvatarListProps> = ({ assets }) => {
  return (
    <AvatarListWrapper>
      {assets.length === 0 && <p>None yet</p>}
      {assets.map((asset, index) => (
        <AvatarWrapper key={index}>
          <img src={asset} alt="thing" />
        </AvatarWrapper>
      ))}
    </AvatarListWrapper>
  );
};

export default AvatarList;
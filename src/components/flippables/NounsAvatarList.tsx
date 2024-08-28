import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { ProfileAvatar } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';
import { useTreasury } from '../../hooks/useTreasury';
import { NounsImage } from './NounsImage';

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
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
}

const NounsAvatarList: React.FC<AvatarListProps> = ({
  dao,
  daoChain
}) => {


  const metadata = {
    name: dao?.name,
    description: dao?.description,
    avatarImg: dao?.avatarImg,
  };

  if (!metadata || !dao) {
    return;
  }

  const {
    votesToDelegate,
    nounsBalance,
    treasuryEthBalance,
    nouns 
  } = useTreasury({ chainId: daoChain as ValidNetwork, daoId: dao.id, treasuryAddress: dao.safeAddress });



  if (!nouns) {
    return null;
  }

  return (
    <AvatarListWrapper>
      {nouns.length === 0 && <p>None yet</p>}
      {nouns.map((tokenId, index) => (
        <AvatarWrapper key={index}>
          <NounsImage nounId={tokenId.toString()} />
        </AvatarWrapper>
      ))}
    </AvatarListWrapper>
  );
};

export default NounsAvatarList;
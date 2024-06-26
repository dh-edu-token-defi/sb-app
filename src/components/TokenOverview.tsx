import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Avatar, Label, ParLg } from "@daohaus/ui";
import { BigH1 } from "./Layout";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
`;

const DetailItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const TokenOverview = ({
  yeeterId,
  daoId,
  daoChain,
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
}) => {
  const { metadata, yeeter } = useYeeter({
    daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  if (!metadata || !yeeter) {
    return;
  }

  return (
    <div>
      <Container>
        <BigH1>{yeeter.dao.lootTokenSymbol}</BigH1>
        <Avatar
          alt={metadata.name}
          fallback="meme avatar"
          size="40rem"
          src={metadata.avatarImg}
        />
      </Container>
      <DetailsContainer>
        <DetailItem>
          <Label>Token Name</Label>
          <ParLg>{metadata.name}</ParLg>
        </DetailItem>
        <DetailItem>
          <Label>About</Label>
          <ParLg>{metadata.description}</ParLg>
        </DetailItem>
      </DetailsContainer>
    </div>
  );
};

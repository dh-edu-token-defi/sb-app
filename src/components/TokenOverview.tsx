import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Avatar, Label, ParLg, ParMd } from "@daohaus/ui";
import { BigH1 } from "./Layout";
import { formatMinContribution } from "../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";

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
  max-width: 500px;
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
          size="35rem"
          src={metadata.avatarImg}
        />
      </Container>
      <DetailsContainer>
        <DetailItem>
          <ParLg>{metadata.name}</ParLg>
          <ParMd>{metadata.description}</ParMd>
        </DetailItem>
        <DetailItem>
          <Label>Presale Duration</Label>
          <ParMd>
            {formatShortDateTimeFromSeconds(yeeter.startTime)} -{" "}
            {formatShortDateTimeFromSeconds(yeeter.endTime)}
          </ParMd>
        </DetailItem>
        <DetailItem>
          <Label>{`Presale Price (for 1000 ${yeeter.dao.lootTokenSymbol})`}</Label>
          <ParMd>{formatMinContribution(yeeter)} (ETH)</ParMd>
        </DetailItem>
      </DetailsContainer>
    </div>
  );
};

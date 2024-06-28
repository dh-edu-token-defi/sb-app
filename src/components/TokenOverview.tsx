import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Avatar, Button, Label, ParLg, ParMd } from "@daohaus/ui";
import { BigH1Blue } from "./Layout/Layout";
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

  console.log("yeeter", yeeter);

  return (
    <div>
      <Container>
        <BigH1Blue>{yeeter.dao.shareTokenSymbol}</BigH1Blue>
        <Avatar
          alt={metadata.name}
          fallback="token avatar"
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
          <Label>{`Presale Price (for 1000 ${yeeter.dao.shareTokenSymbol})`}</Label>
          <ParMd>{formatMinContribution(yeeter)} (ETH)</ParMd>
        </DetailItem>
        <Button size="lg" style={{ marginTop: "2rem" }} variant="outline">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Check out the ${metadata.name} / ${yeeter.dao.shareTokenSymbol} token here: ${window.location.href}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            SHARE
          </a>
        </Button>
      </DetailsContainer>
    </div>
  );
};

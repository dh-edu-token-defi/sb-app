import styled from "styled-components";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { Avatar, Card, Label, ParLg, ParMd } from "@daohaus/ui";
import {
  formatMinContribution,
  formatTimeRemainingShort,
  formatTimeUntilPresale,
  getCampaignStatus,
} from "../utils/yeetDataHelpers";
import { YeetGoalProgress } from "./YeetGoalProgress";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { BigH1 } from "./Layout/Layout";
import { useAuctionHaus } from "../hooks/useAuctionHaus";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;

const DetailsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;

  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;

const DetailItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;

const DetailItemWarning = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.warning.step10};
`;

export const YeeterDetails = ({
  yeeterId,
  daoId,
  daoChain,
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
}) => {
  const { dao } = useDaoData({ daoId, daoChain });

  const metadata = {
    name: "yeeter",
    avatarImg: "https://avatars.githubusercontent.com/u/110000?v=4",
  };

  const yeeter = {
    dao: {
      shareTokenSymbol: "YTR",
    },
    isActive: true,
    reachedGoal: true,
    startTime: "1630406400",
    endTime: "1630406400",
    isComing: false,
    isEnded: false,
    safeBalance: "0",
  };

  const { auctionHausShaman } =
    useAuctionHaus({
      daoId,
      yeeterShamanAddress: yeeterId,
      chainId: daoChain,
      daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
    });

  if (!metadata || !yeeter || !dao || !auctionHausShaman) {
    return;
  }


  return (
    <div>
      <BigH1>{yeeter.dao.shareTokenSymbol}</BigH1>
      <Container>
        <ImageContainer>
          <Avatar
            alt={metadata.name}
            fallback="token avatar"
            size="20rem"
            src={metadata.avatarImg}
          />
        </ImageContainer>
        <DetailsContainer>
          <DetailItem>
            <Label>Token Name / Symbol:</Label>
            <ParLg>
              {metadata.name} / {yeeter.dao.shareTokenSymbol}
            </ParLg>
          </DetailItem>
          <DetailItem>
            <Label>Start Date:</Label>
            <ParLg>
              {new Date(parseInt(yeeter.startTime) * 1000).toLocaleString()}
            </ParLg>
          </DetailItem>
          <DetailItem>
            <Label>End Date:</Label>
            <ParLg>
              {new Date(parseInt(yeeter.endTime) * 1000).toLocaleString()}
            </ParLg>
          </DetailItem>




        </DetailsContainer>
      </Container>
    </div>
  );
};

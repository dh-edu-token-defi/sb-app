import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { Avatar, Card, Label, ParLg, ParMd } from "@daohaus/ui";
import {
  formatMinContribution,
  formatTimeRemainingShort,
  formatTimeUntilPresale,
  getCampaignStatus,
} from "../utils/yeetDataHelpers";
import { YeetGoalProgress } from "./YeetGoalProgress";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { useDaoData } from "../hooks/useDaoData";
import { BigH1 } from "./Layout/Layout";

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
  const { metadata, yeeter } = useYeeter({
    daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  const { marketMakerShaman, canExecute, executed, goalAchieved, uniswapUrl } =
    useMarketMaker({
      daoId,
      yeeterShamanAddress: yeeterId,
      chainId: daoChain,
      daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
    });

  if (!metadata || !yeeter || !dao || !marketMakerShaman) {
    return;
  }

  const campaignStatus = getCampaignStatus(
    yeeter,
    executed || false,
    canExecute || false,
    goalAchieved || false
  );

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
          <DetailItem>
            <Label>Presale Minimum Contrbution:</Label>
            <ParLg>{formatMinContribution(yeeter)} (ETH)</ParLg>
          </DetailItem>
          <DetailItem>
            <Label>Total Raise Status:</Label>
            <ParLg>{campaignStatus}</ParLg>
          </DetailItem>
          {yeeter.isActive && (
            <DetailItemWarning>
              <Label>Presale Ends</Label>
              <ParLg>{formatTimeRemainingShort(yeeter)}</ParLg>
            </DetailItemWarning>
          )}

          {yeeter.isComing && (
            <DetailItemWarning>
              <Label>Presale Starts</Label>
              <ParLg>{formatTimeUntilPresale(yeeter)}</ParLg>
            </DetailItemWarning>
          )}
          {yeeter.isEnded && (
            <>
              {executed ? (
                <ParMd>Reached Goal</ParMd>
              ) : (
                <ParMd>
                  {`${formatValueTo({
                    value: fromWei(yeeter.safeBalance.toString()),
                    decimals: 5,
                    format: "number",
                  })} ETH Raised`}
                </ParMd>
              )}
              <ParLg>Status: {campaignStatus}</ParLg>
            </>
          )}
          {!executed && (
            <YeetGoalProgress yeeter={yeeter} dao={dao} chainId={daoChain} />
          )}
        </DetailsContainer>
      </Container>
    </div>
  );
};

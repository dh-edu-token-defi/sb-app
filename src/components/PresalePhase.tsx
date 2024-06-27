import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useMarketMaker } from "../hooks/useMarketMaker";
import {
  Avatar,
  Card,
  H2,
  H3,
  Label,
  ParLg,
  ParMd,
  ParSm,
  widthQuery,
} from "@daohaus/ui";
import {
  formatMinContribution,
  formatTimeRemainingShort,
  formatTimeUntilPresale,
  getCampaignStatus,
} from "../utils/yeetDataHelpers";
import { YeetGoalProgress } from "./YeetGoalProgress";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { useDaoData } from "../hooks/useDaoData";
import { BigH1 } from "./Layout";
import SwapButton from "./SwapButton";
import ExecuteLPButton from "./ExecuteLPButton";

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

export const BigH2 = styled(H2)`
  font-size: 18rem;
  line-height: 12rem;
  word-break: break-all;
  @media ${widthQuery.sm} {
    font-size: 10rem;
    line-height: 6rem;
  }
`;
export const BigH3 = styled(H3)`
  font-size: 10rem;
  line-height: 10rem;
  word-break: break-all;
  @media ${widthQuery.sm} {
    font-size: 5rem;
    line-height: 5rem;
  }
`;

export const PresalePhase = ({
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

  const { marketMakerShaman, canExecute, executed, uniswapUrl } =
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
    canExecute || false
  );

  const success =
    campaignStatus === "CAN EXECUTE" || campaignStatus === "SUCCESS";

  return (
    <div>
      <BigH2>SPEEDBALLING</BigH2>
      {yeeter.isComingSoon && (
        <>
          <BigH3>TO PRESALE START</BigH3>
          <DetailItemWarning>
            <Label>Presale Starts</Label>
            <ParLg>{formatTimeUntilPresale(yeeter)}</ParLg>
          </DetailItemWarning>
        </>
      )}
      {yeeter.isActive && (
        <>
          <BigH3>TO PRESALE END</BigH3>
          <DetailItemWarning>
            <Label>Presale Ends</Label>
            <ParLg>{formatTimeRemainingShort(yeeter)}</ParLg>
          </DetailItemWarning>
        </>
      )}
      {success && (
        <>
          <BigH3>TO LIQUIDITY</BigH3>
          {executed && (
            <>
              <ParSm>
                The Presale was a success and the Uniwap Pool was created.
              </ParSm>
              <SwapButton
                daoChain={daoChain}
                daoId={daoId}
                yeeterId={yeeterId}
              />
            </>
          )}
          {!executed && (
            <>
              <ParSm>
                The Presale was a success. The Uniswap Pool can be created.
              </ParSm>
              <ExecuteLPButton
                daoChain={daoChain}
                yeeterId={yeeterId}
                daoId={daoId}
              />
            </>
          )}
        </>
      )}
      {campaignStatus === "FAIL" && (
        <>
          <BigH3>TO NOWHERE</BigH3>
          <ParLg>
            {`${formatValueTo({
              value: fromWei(yeeter.safeBalance.toString()),
              decimals: 5,
              format: "number",
            })} ETH Raised, but it wasn't enough`}
          </ParLg>
        </>
      )}
    </div>
  );
};

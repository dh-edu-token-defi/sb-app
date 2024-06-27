import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import Countdown from "react-countdown";
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
import SwapButton from "./SwapButton";
import ExecuteLPButton from "./ExecuteLPButton";

const DetailItemWarning = styled.div`
  padding: 1rem 2rem;
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

  const { marketMakerShaman, canExecute, executed, goalAchieved } =
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

  const success =
    campaignStatus === "CAN EXECUTE" || campaignStatus === "SUCCESS";

  return (
    <div>
      <BigH2>SPEEDBALLING</BigH2>
      {yeeter.isComingSoon && (
        <>
          <BigH3>TO PRESALE START</BigH3>
          <DetailItemWarning>
            <BigH2>
              <Countdown date={new Date(Number(yeeter.startTime) * 1000)} />
            </BigH2>
          </DetailItemWarning>
        </>
      )}
      {yeeter.isActive && (
        <>
          <BigH3>TO PRESALE END</BigH3>
          <DetailItemWarning>
            <BigH2>
              <Countdown date={new Date(Number(yeeter.endTime) * 1000)} />
            </BigH2>
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

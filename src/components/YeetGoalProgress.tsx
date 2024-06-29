import { DataIndicator, DataXl, ParLg, widthQuery } from "@daohaus/ui";
import styled, { keyframes } from "styled-components";
import { ProgressBar } from "./ProgressBar";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { YeeterItem } from "../utils/types";
import { calcProgressPerc } from "../utils/yeetDataHelpers";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { BigH3 } from "./PresalePhase";
import { TbCoins } from "react-icons/tb";

const jumpShake = keyframes`
  0% { transform: translateY(0) }
  25% { transform: translateY(5px) }
  50% { transform: translateY(-5px) }
  75% { transform: translateY(5px) }
  100% { transform: translateY(0) }
`;

const ProgressRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;
  .bar {
    width: 100%;
  }
  .jump-shake {
    animation: ${jumpShake} 0.3s infinite;
  }

  @media ${widthQuery.xs} {
    flex-direction: column;
    .bar {
      width: 100%;
    }
  }
`;

const GoalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
  p {
    color: ${({ theme }) => theme.warning.step10};
  }
  .jump-shake {
    animation: ${jumpShake} 0.3s infinite;
  }
`;

export const YeetGoalProgress = ({
  yeeter,
  dao,
  chainId,
}: {
  yeeter: YeeterItem;
  dao: MolochV3Dao;
  chainId: string;
}) => {
  if (
    !yeeter ||
    yeeter.safeBalance === undefined ||
    yeeter.goal === undefined
  ) {
    return null;
  }

  const percentageComplete = yeeter
    ? `${calcProgressPerc(yeeter.safeBalance, yeeter.goal)}%`
    : "0%";

  const reachedGoal = calcProgressPerc(yeeter.safeBalance, yeeter.goal) > 100;

  return (
    <>
      <ProgressRow>
        <BigH3>RAISED</BigH3>
        <DataIndicator
          // label="Raised"
          data={`${formatValueTo({
            value: fromWei(yeeter.safeBalance),
            decimals: 5,
            format: "numberShort",
          })} of ${formatValueTo({
            value: fromWei(yeeter.goal),
            decimals: 5,
            format: "numberShort",
          })} ${HAUS_NETWORK_DATA[chainId as ValidNetwork]?.symbol}`}
        />
        <div className={reachedGoal ? "bar jump-shake" : "bar"}>
          <ProgressBar
            progressSection={[
              { percentage: percentageComplete, color: "green" },
            ]}
            backgroundColor="black"
          />
        </div>
      </ProgressRow>

      {reachedGoal && (
        <GoalRow>
          <DataXl className="jump-shake">
            <TbCoins /> <TbCoins /> <TbCoins />
          </DataXl>
          <DataXl className="jump-shake">We Did It!</DataXl>
          <DataXl className="jump-shake">
            <TbCoins /> <TbCoins /> <TbCoins />
          </DataXl>
        </GoalRow>
      )}
    </>
  );
};

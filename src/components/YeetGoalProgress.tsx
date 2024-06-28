import { DataIndicator, ParLg, widthQuery } from "@daohaus/ui";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { YeeterItem } from "../utils/types";
import { calcProgressPerc } from "../utils/yeetDataHelpers";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { BigH3 } from "./PresalePhase";

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

  @media ${widthQuery.xs} {
    flex-direction: column;
    .bar {
      width: 100%;
    }
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
        <div className="bar">
          <ProgressBar
            progressSection={[
              { percentage: percentageComplete, color: "green" },
            ]}
            backgroundColor="black"
          />
        </div>
      </ProgressRow>
    </>
  );
};

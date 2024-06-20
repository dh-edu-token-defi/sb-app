import { DataIndicator, widthQuery } from "@daohaus/ui";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { YeeterItem } from "../utils/types";
import { calcProgressPerc } from "../utils/yeetDataHelpers";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

const ProgressRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
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
  if (!yeeter || yeeter.balance === undefined || yeeter.goal === undefined) {
    return null;
  }

  // Find the first vault with the name "Treasury"
const treasuryVault = dao.vaults.find(vault => vault.name === "Treasury");

// Find the first balance where tokenAddress is null
const tokenBalance = treasuryVault?.tokenBalances.find(balance => balance.tokenAddress === null);

if (!tokenBalance) {
  return null;
}

console.log("balance!!!!!!!!", tokenBalance.balance);
  

  const percentageComplete = yeeter
    ? `${calcProgressPerc(tokenBalance.balance , yeeter.goal)}%`
    : "0%";

  console.log("percentageComplete", percentageComplete);

  return (
    <> 
      {!yeeter.isComingSoon && (
        <ProgressRow>
          <DataIndicator
            label="Raised"
            data={`${formatValueTo({
              value: fromWei(tokenBalance.balance),
              decimals: 3,
              format: "numberShort",
            })} of ${formatValueTo({
              value: fromWei(yeeter.goal),
              decimals: 3,
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
      )}
    </>
  );
};
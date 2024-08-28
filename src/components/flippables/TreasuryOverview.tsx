import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {
  Avatar,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  Label,
  ParLg,
  ParMd,
  AddressDisplay,
  DataIndicator,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds, formatValueTo, fromWei, truncateAddress } from "@daohaus/utils";


import { Actions, DetailItem, DetailItemBg, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { useTreasury } from "../../hooks/useTreasury";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ButtonRouterLink } from "../ButtonRouterLink";


export const TreasuryOverview = ({
  dao,
  daoChain,
  yeeterId

}: {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  yeeterId: string;
}) => {


  const {
    votesToDelegate,
    nounsBalance,
    treasuryEthBalance,
    nouns } = useTreasury({ chainId: daoChain as ValidNetwork, daoId: dao.id, treasuryAddress: dao.safeAddress });


  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>{"Treasury"}</BigH1Blue>

        <DetailItemBg>
          <Label>Safe</Label>

          <AddressDisplay address={dao.safeAddress} truncate copy />
        </DetailItemBg>
        <DetailItem>
          <Label>Nouns</Label>
          <ParMd>{nounsBalance?.toString()}</ParMd>
        </DetailItem>
        <DetailItem>
          <DataIndicator
            data={`${formatValueTo({
              value: fromWei(treasuryEthBalance?.toString() || "0"),
              decimals: 5,
              format: "numberShort",
            })}  ${HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol}`} />
        </DetailItem>

        <Actions>
          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${dao.id}/${yeeterId}/delegate`}
          >
            CAPTAIN: DELEGATE NOUNS
          </ButtonRouterLink>
        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};


import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  Avatar,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  Label,
  ParLg,
  ParMd,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";
import { CopyToClipboardButton } from "../CopyToClipboardButton";
import { RiExternalLinkLine } from "react-icons/ri";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";


export const ProposalOverview = ({
  yeeterId,
  daoId,
  daoChain,
  dao
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
  dao: MolochV3Dao
}) => {



  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>Proposals</BigH1Blue>

        <DetailItem>
          <ParLg>Pizza Party</ParLg>
          <ParMd>To all my friends</ParMd>
        </DetailItem>
        <DetailItem>
          <Label>Status</Label>
          <ParMd>

          </ParMd>
        </DetailItem>
        <Actions>
          <Button size="lg" variant="ghost">NEW <RiExternalLinkLine /></Button>
          <Button size="lg" variant="ghost">VOTE <RiExternalLinkLine /></Button>
          <Button size="lg" variant="ghost">SHARE <RiExternalLinkLine /></Button>
        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};

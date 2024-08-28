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
  ParSm,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { formatShortDateTimeFromSeconds } from "@daohaus/utils";
import { CopyToClipboardButton } from "../CopyToClipboardButton";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import BuyButton from "../BuyButton";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { JoinForm } from "../forms/JoinForm";
import { ButtonRouterLink } from "../ButtonRouterLink";



export const TokenOverview = ({
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

  // mock metadata and yeeter

  const metadata = {
    name: dao?.name,
    description: dao?.description,
    avatarImg: dao?.avatarImg,
  };

  if (!metadata || !dao) {
    return;
  }

  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>AUKTION</BigH1Blue>
        <BigH1Blue>HAUS</BigH1Blue>


        <DetailItem>
          <ParLg>Token Symbol</ParLg>
          <ParMd>{dao.shareTokenSymbol}</ParMd>
          <ParSm>{metadata.name}</ParSm>
          <ParSm>{metadata.description}</ParSm>
        </DetailItem>

        <Actions>
        <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/share`}
          >
            SHARE
          </ButtonRouterLink>

          <ButtonRouterLink
            to={`/molochv3/${daoChain}/${daoId}/${yeeterId}/join`}
          >
            JOIN
          </ButtonRouterLink>

        </Actions>
      </DetailsContainer>



    </Wrapper>
  );
};

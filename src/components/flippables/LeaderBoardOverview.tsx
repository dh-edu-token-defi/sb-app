import styled from "styled-components";
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
  ProfileAvatar,
  AddressDisplay,
} from "@daohaus/ui";
import { BigH1Blue } from "../Layout/Layout";

import { CopyToClipboardButton } from "../CopyToClipboardButton";

import { Actions, DetailItem, DetailsContainer, SimpleRow, StyledDialogContent, Wrapper } from "./flipables.styles";
import { useDaoData, useDaoMembers, useProfile } from "@daohaus/moloch-v3-hooks";
import { formatValueTo, fromWei, ZERO_ADDRESS } from "@daohaus/utils";
import { useAuctionHaus } from "../../hooks/useAuctionHaus";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { useMemo } from "react";


const LeaderBoard = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  gap: 1rem;
`

const LeaderBoardItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;

`

export const LeaderBoardOverview = ({
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



  const { captain } = useAuctionHaus({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });

  const memoizedCaptain = useMemo(() => captain, [captain]);


  const { profile: captainProfile } = useProfile({
    address: memoizedCaptain || ZERO_ADDRESS
  })

  const memoizedCaptainProfile = useMemo(() => captainProfile, [captainProfile]);

  const { members } = useDaoMembers({ daoId, daoChain });



  return (
    <Wrapper>

      <DetailsContainer>
        <BigH1Blue>TOP HOLDERS</BigH1Blue>
        <LeaderBoard>


          {members.map((member, index) => (
            <LeaderBoardItem key={index}>
              <ParSm>{formatValueTo({
                value: fromWei(member.shares.toString()),
                decimals: 2,
                format: "numberShort",
              })}</ParSm>
              {/* <ProfileAvatar size="sm" address={member.memberAddress} src={""} /> */}
              <AddressDisplay address={member.memberAddress} truncate copy />
            </LeaderBoardItem>
          ))
          }
          {members.length === 0 && (
            <ParMd>No members yet</ParMd>
          )}

        </LeaderBoard>

        {memoizedCaptainProfile?.address && (<DetailItem>
          <ParLg>Captain</ParLg>
          <ProfileAvatar size="xl" address={memoizedCaptainProfile?.address} src={memoizedCaptainProfile.avatar || ""} />
          {memoizedCaptainProfile?.address && <AddressDisplay address={memoizedCaptainProfile.address} truncate copy />}
        </DetailItem>)}
        <Actions>
          <Button size="lg" variant="ghost">
            PROPOSE NEW CAPTAIN
          </Button>

        </Actions>
      </DetailsContainer>

    </Wrapper>
  );
};

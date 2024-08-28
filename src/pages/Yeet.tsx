import { useCurrentDao, useDaoMembers } from "@daohaus/moloch-v3-hooks";
import { Avatar, H4, widthQuery } from "@daohaus/ui";
import { useCurrentYeeter } from "../contexts/CurrentYeeterContext";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";
import styled from "styled-components";
import { FlippableCard } from "../components/flippables/FlippableCard";
import { LastBidOverview } from "../components/flippables/LastBidOverview";
import { TreasuryOverview } from "../components/flippables/TreasuryOverview";
import { MembersOverview } from "../components/flippables/MembersOverview";
import { CommsOverview } from "../components/flippables/CommsOverview";
import { NounsDaoOverview } from "../components/flippables/NounsDAOOverview";
import AvatarList from "../components/flippables/AvatarList";
import { LeaderBoardOverview } from "../components/flippables/LeaderBoardOverview";
import { CurrentAuctionOverview } from "../components/flippables/CurrentAuctionOverview";
import { DaoOverview } from "@daohaus/moloch-v3-macro-ui";
import { TokenOverview } from "../components/flippables/DaoOverview";
import { ProposalOverview } from "../components/flippables/ProposalOverview";
import { useNounsAuctionHouse } from "../hooks/useNounsAuctionHouse";
import { CURATOR_CONTRACTS } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData } from "../hooks/useDaoData";
import { NounsImage } from "../components/flippables/NounsImage";
import ProfileAvatarList from "../components/flippables/ProfileAvatarList";
import NounsAvatarList from "../components/flippables/NounsAvatarList";

const ColumnContainer = styled.div`
  width: 100%;
  .split {
    display: flex;
    flex-direction: row;
    gap: 5rem;
    @media ${widthQuery.md} {
      flex-direction: column;
    }
    .div {
      display: flex;
      flex-direction: column;
    }
  }
  @media ${widthQuery.sm} {
    padding: 1rem 0;
    margin-top: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px; 

  @media ${widthQuery.sm} {
    grid-template-columns: 1fr;
  }
`;


const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export function Yeet() {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  if (!daoId || !daoChain || !shamanAddress) return null;

  const { dao } = useDaoData({ daoId, daoChain });

  if (!dao) return null;


  // const {membersMock} = useDaoMembers();

  // console.log("dao", daoId)
  
  


  const membersMock = [
    "https://hackmd.io/_uploads/r1MAfIUjR.png",
    "https://hackmd.io/_uploads/r1xJm8UoA.png",
    "https://hackmd.io/_uploads/H187QI8iA.png",
    "https://hackmd.io/_uploads/Hkuz7UUsA.png",
    "https://hackmd.io/_uploads/B1n17ILjR.png",
    "https://hackmd.io/_uploads/Bk5x7LIsR.png",
    "https://hackmd.io/_uploads/H187QI8iA.png",
    "https://hackmd.io/_uploads/ByZfQLLiR.png",
    "https://hackmd.io/_uploads/Hkuz7UUsA.png",
    "https://hackmd.io/_uploads/B1n17ILjR.png",
    "https://hackmd.io/_uploads/Bk5x7LIsR.png",
    "https://hackmd.io/_uploads/ByZfQLLiR.png",
    "https://hackmd.io/_uploads/r1xJm8UoA.png",
    "https://hackmd.io/_uploads/H187QI8iA.png",
    "https://hackmd.io/_uploads/B1n17ILjR.png",
  ]

  const treasuryNouns = [
    "https://hackmd.io/_uploads/HyX0BS8j0.png",
    "https://hackmd.io/_uploads/By8xIHIoA.png",
    "https://hackmd.io/_uploads/S13S8BUs0.png",
    "https://hackmd.io/_uploads/HyX0BS8j0.png",
    "https://hackmd.io/_uploads/BJAELBUjC.png",
    "https://hackmd.io/_uploads/S13S8BUs0.png",
    "https://hackmd.io/_uploads/HyX0BS8j0.png",
    "https://hackmd.io/_uploads/By8xIHIoA.png",
    "https://hackmd.io/_uploads/BJAELBUjC.png",
    "https://hackmd.io/_uploads/By8xIHIoA.png",
    "https://hackmd.io/_uploads/BJAELBUjC.png",
  ]

  return (
    <WideColumnLayout>
      {shamanAddress && daoId && daoChain && (
        <ColumnContainer>
          <GridContainer>
            <FlippableCard
              frontComponentLeft={() => (
                <CardImage src={
                  //dao?.avatarImg 
                  "https://api.cloudnouns.com/v1/pfp" || "https://api.cloudnouns.com/v1/pfp"} alt={"Dao Avatar"} />
              )}
              frontComponentRight={() => (
                <TokenOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />
              )}
              backComponent={() => (
                <CommsOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />

              )}
              backgroundColor="#1A84DD"
            />

            <FlippableCard
              frontComponentLeft={() => (
                <NounsImage nounId="85" />
              )}
              frontComponentRight={() => (

                <CurrentAuctionOverview
                  daoId={daoId}
                  daoChain={daoChain}
                />

              )}
              backComponent={() => (
                <LastBidOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />

              )}
              backgroundColor="#6D94CE"
            />
                        
            <FlippableCard
              frontComponentLeft={() => (
                <ProfileAvatarList  />
              )}
              frontComponentRight={() => (
                <MembersOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />

              )}
              backComponent={() => (
                <LeaderBoardOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />

              )}
              backgroundColor="#FE1D5B"
            />

            <FlippableCard
              frontComponentLeft={() => (
                NounsAvatarList({dao, daoChain})
              )}
              frontComponentRight={() => (
                <TreasuryOverview
                  dao={dao}
                  daoChain={daoChain}
                  yeeterId={shamanAddress}
                />
              )}
              backComponent={() => (
                <ProposalOverview
                  yeeterId={shamanAddress}
                  daoId={daoId}
                  daoChain={daoChain}
                  dao={dao}
                />

              )}
              backgroundColor="#F2CF63"
            />

          </GridContainer>
        </ColumnContainer>
      )}
    </WideColumnLayout>
  );
}

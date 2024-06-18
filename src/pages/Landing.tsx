import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  H4,
  ParMd,
  ParSm,
  SingleColumnLayout,
} from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeters } from "../hooks/useYeeters";
import { YeeterList } from "../components/YeeterList";
import { Spacer } from "../components/Layout";
import { useLatestYeets } from "../hooks/useLatestYeets";
import { YeetMarquee } from "../components/YeetMarquee";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;
const BigH1 = styled(H1)`
  font-size: 20rem;
  line-height: 12rem;
`;

const Landing = () => {
  const { chainId, isConnected, address } = useDHConnect();

  const { allYeeters, activeYeetrs, upcomingYeeters, finishedYeeters } =
    useYeeters({ chainId: DEFAULT_CHAIN_ID });

  const { yeets } = useLatestYeets({ chainId: DEFAULT_CHAIN_ID });

  console.log("activeYeetrs", activeYeetrs);

  return (
    <>
      {chainId && chainId in supportedNetorks ? (
        <SingleColumnLayout
          subtitle={"Welcome to the NFT Escrow summoner".toUpperCase()}
          title="NFT ESCROW YEETER - Decentralized NFT Raids"
        >
          <div>
            <H4>Create a nft escrow yeeter</H4>
            <ParSm>
              Create a nft escrow yeeter and invite your friends to join the
              raid. Once the raid is finished, the nft will be released to the
              DAO as a tokenized asset.
            </ParSm>
            <Spacer />
              <LinkButton to="/summon/topic">
                <Button variant="outline">Summon a NFT Escrow</Button>
              </LinkButton>


            {yeets && allYeeters && (
              <YeetMarquee
                yeets={yeets}
                yeeters={allYeeters.slice(0, 5)}
                chainId={DEFAULT_CHAIN_ID}
              />
            )}

            <Spacer />
            <Spacer />
            <Spacer />

            <Spacer>
              {activeYeetrs && (
                <YeeterList title="Active Presale" yeeters={activeYeetrs} />
              )}

              {upcomingYeeters && (
                <YeeterList title="Coming Soon" yeeters={upcomingYeeters} />
              )}
              {finishedYeeters && (
                <YeeterList
                  title="Completed Presale"
                  yeeters={finishedYeeters}
                />
              )}

              {/* <H6>My Yeeters</H6>

              {myYeeters && <YeeterList yeeters={myYeeters} />} */}
            </Spacer>
          </div>
        </SingleColumnLayout>
      ) : (
        <div>
          {!isConnected && (
            <>
              <h1>Not Connected</h1>
              <p>Please connect your wallet to continue.</p>
            </>
          )}
          {isConnected && <h1>Unsupported Network. Switch to sepolia</h1>}
        </div>
      )}
    </>
  );
};

export default Landing;

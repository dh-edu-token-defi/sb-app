import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import { Button, H4, H6, Link, ParSm, SingleColumnLayout } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { ADMIN_URL, DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeters } from "../hooks/useYeeters";
import { YeeterList } from "../components/YeeterList";
import { Spacer } from "../components/Layout";
import { useLatestYeets } from "../hooks/useLatestYeets";
import { useMyYeeters } from "../hooks/useMyYeeters";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;

const ExternalLinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const Landing = () => {
  const { chainId, isConnected, address } = useDHConnect();

  const { allYeeters, activeYeetrs, upcomingYeeters, finishedYeeters } =
    useYeeters({ chainId: DEFAULT_CHAIN_ID });

  const { yeets } = useLatestYeets({ chainId: DEFAULT_CHAIN_ID });

  const { myYeeters } = useMyYeeters({
    chainId: DEFAULT_CHAIN_ID,
    account: address,
  });

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
            <Spacer>
              <LinkButton to="/summon/topic">
                <Button variant="outline">Summon a NFT Escrow</Button>
              </LinkButton>
            </Spacer>

            <H4>Meme Yeets</H4>
            <Spacer>
              <H6>Latest Tokens</H6>
              {allYeeters && <YeeterList yeeters={allYeeters.slice(0, 3)} />}
              <H6>Latest Yeets</H6>

              {yeets && <pre>{JSON.stringify(yeets, null, 2)}</pre>}

              <H6>Active</H6>

              {activeYeetrs && <YeeterList yeeters={activeYeetrs} />}

              <H6>Upcoming</H6>
              {upcomingYeeters && <YeeterList yeeters={upcomingYeeters} />}
              <H6>Finished</H6>

              {finishedYeeters && <YeeterList yeeters={finishedYeeters} />}

              <H6>My Yeeters</H6>

              {myYeeters && <YeeterList yeeters={myYeeters} />}
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
          <ExternalLinkButton
            showExternalIcon={true}
            target="_blank"
            href={`${ADMIN_URL}`}
          >
            Continue To Topic List
          </ExternalLinkButton>
        </div>
      )}
    </>
  );
};

export default Landing;

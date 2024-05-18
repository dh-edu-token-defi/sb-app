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
          subtitle={"Welcome to the MEME summoner".toUpperCase()}
          title="MEME YEETER - Decentralized Meme Factory"
        >
          <div>
            <H4>Create a meme yeeter</H4>
            <ParSm>
              Start with a 24 hr oParSmen presale, if the threshold is met the
              meme will be minted and the presale will close. If the threshold
              is not met the presale will close and contributors can ragequit.
              If the meme is minted, a univ3 LP is started and the meme will be
              available for purchase on the marketplace. Welcome to fully
              dilluted, unruggable, fair launch yeeter memes.
            </ParSm>
            <Spacer>
              <LinkButton to="/summon/topic">
                <Button variant="outline">Summon a Meme</Button>
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

import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import { Button, H4, H6, Link, ParSm, SingleColumnLayout } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { ADMIN_URL, DEFAULT_CHAIN_ID } from "../utils/constants";
import { UserDaos } from "../components/UserDaos";
import { useYeeters } from "../hooks/useYeeters";

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

const Spacer = styled.div`
  margin: 3rem 0 3rem 0;
`;

const Landing = () => {
  const { chainId, isConnected, address } = useDHConnect();

  const { allYeeters, activeYeetrs, upcomingYeeters, finishedYeeters } =
    useYeeters({ chainId: DEFAULT_CHAIN_ID });

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
              <H6>Latest</H6>
              {allYeeters && (
                <div>
                  <pre>{JSON.stringify(allYeeters.slice(0, 3), null, 2)}</pre>
                </div>
              )}

              <H6>Active</H6>

              {activeYeetrs && (
                <div>
                  <pre>{JSON.stringify(activeYeetrs, null, 2)}</pre>
                </div>
              )}

              <H6>Upcoming</H6>
              {upcomingYeeters && (
                <div>
                  <pre>{JSON.stringify(upcomingYeeters, null, 2)}</pre>
                </div>
              )}
              <H6>Finished</H6>

              {finishedYeeters && (
                <div>
                  <pre>{JSON.stringify(finishedYeeters, null, 2)}</pre>
                </div>
              )}
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

import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeters } from "../hooks/useYeeters";
import { YeeterList } from "../components/YeeterList";
import { SimpleCol, SimpleRow, Spacer } from "../components/Layout";
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
          subtitle={"Decentralized Token Factory".toUpperCase()}
        >
          <div>
            <BigH1>MEME SHOP</BigH1>
            <Spacer />
            <SimpleRow>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    What is this?
                  </Button>
                </DialogTrigger>
                <DialogContent
                  title=" Welcome to fully dilluted, unruggable, fair launch meme
                    tokens"
                >
                  <SimpleCol>
                    <ParMd>* 24 hr presale</ParMd>
                    <ParMd>
                      * If the threshold is met the meme will be minted, the
                      presale will close and a Uniswap v3 LP is started. The
                      meme will be available for purchase on the marketplace.
                    </ParMd>
                    <ParMd>
                      * If the threshold is not met the presale will close and
                      contributors can exit.
                    </ParMd>
                  </SimpleCol>
                </DialogContent>
              </Dialog>

              <LinkButton to="/summon/token">
                <Button variant="outline" size="lg">
                  Build a Meme
                </Button>
              </LinkButton>
            </SimpleRow>

            <Spacer />

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

import { useState } from "react";
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
import { APP_NAME, DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeters } from "../hooks/useYeeters";
import { YeeterList } from "../components/YeeterList";
import { SimpleCol, SimpleRow, Spacer } from "../components/Layout";
import { useLatestYeets } from "../hooks/useLatestYeets";
import { YeetMarquee } from "../components/YeetMarquee";
import { useMyYeeters } from "../hooks/useMyYeeters";
import { useRagequits } from "../hooks/useRagequits";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;
const BigH1 = styled(H1)`
  font-size: 20rem;
  line-height: 12rem;
`;

const StyledDialogContent = styled(DialogContent)`
  z-index: 10;
`;

const Landing = () => {
  const { chainId, isConnected, address } = useDHConnect();

  const { allYeeters, activeYeetrs, upcomingYeeters, finishedYeeters } =
    useYeeters({ chainId: DEFAULT_CHAIN_ID });

  const { myYeeters } = useMyYeeters({
    chainId: DEFAULT_CHAIN_ID,
    account: address,
  });

  const { yeets } = useLatestYeets({ chainId: DEFAULT_CHAIN_ID });

  const { ragequits } = useRagequits({
    chainId: DEFAULT_CHAIN_ID,
  });

  const [mine, setMine] = useState(false);

  const hasMyYeeters = myYeeters.length > 0;

  return (
    <>
      {chainId && chainId in supportedNetorks ? (
        <WideColumnLayout
          subtitle={"Decentralized Fair Token Launcher".toUpperCase()}
        >
          <div>
            <BigH1>{APP_NAME}</BigH1>
            <Spacer />
            <SimpleRow>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    What is this?
                  </Button>
                </DialogTrigger>
                <StyledDialogContent
                  title=" Welcome to fully dilluted, unruggable, fair launch
                    tokens"
                >
                  <SimpleCol>
                    <ParMd>
                      * Create your token to kick off the 48-hour presale
                    </ParMd>
                    <ParMd>
                      * If the threshold is met, the presale will close, and a
                      Uniswap v3 liquidity pool will be initiated with the all
                      ETH raised in the presale. Your token will become
                      available for purchase on the marketplace.
                    </ParMd>
                    <ParMd>
                      * If the threshold is not met, the presale will close, and
                      contributors will be able to withdraw their contributions.
                    </ParMd>
                  </SimpleCol>
                </StyledDialogContent>
              </Dialog>

              <LinkButton to="/summon/token">
                <Button variant="outline" size="lg">
                  Create a Token Presale
                </Button>
              </LinkButton>
            </SimpleRow>

            <Spacer />

            {yeets && allYeeters && (
              <YeetMarquee
                yeets={yeets}
                yeeters={allYeeters.slice(0, 5)}
                ragequits={ragequits}
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
                <YeeterList
                  title="Upcoming Presale"
                  yeeters={upcomingYeeters}
                />
              )}
              {finishedYeeters && (
                <YeeterList
                  title="Completed Presale"
                  yeeters={hasMyYeeters && mine ? myYeeters : finishedYeeters}
                  canToggle={hasMyYeeters}
                  toggle={mine}
                  setToggle={setMine}
                />
              )}

              {/* <H6>My Yeeters</H6>

              {myYeeters && <YeeterList yeeters={myYeeters} />} */}
            </Spacer>
          </div>
        </WideColumnLayout>
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

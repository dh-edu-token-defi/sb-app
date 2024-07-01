import styled from "styled-components";
import { DataLg, DataXl, H3, H4, ParLg, ParMd, widthQuery } from "@daohaus/ui";
import { APP_NAME } from "../utils/constants";
import {
  BigH1,
  SimpleCol,
  SimpleRow,
  Spacer,
} from "../components/Layout/Layout";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";

import BallGif from "../assets/ball-gif.gif";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  width: 100%;
  padding: 2rem 0;
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
  .image {
    width: 20%;
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
  .text {
    width: 60%;
    @media ${widthQuery.sm} {
      width: 100%;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`;

const Bullet = styled(SimpleRow)`
  align-items: center;
  gap: 1rem;
`;

const About = () => {
  return (
    <>
      <WideColumnLayout subtitle="WHAT IS THIS?">
        <div>
          <BigH1>{APP_NAME}</BigH1>
          <Spacer />
          <SimpleRow>
            <H3>DECENTRALIZED FAIR TOKEN PRESALES</H3>
            <ParLg>
              A permissionless and transparent platform designed to democratize
              the token presale process. Speedball transforms traditional token
              launches, providing a secure and equitable way for all
              participants to engage in and benefit from the DeFi space.
            </ParLg>
            <SimpleCol>
              <Bullet>
                <img src={BallGif} height="50px" />
                <ParLg>
                  Speedball eliminates insider manipulation by ensuring fair and
                  open participation
                </ParLg>
              </Bullet>
              <Bullet>
                <img src={BallGif} height="50px" />
                <ParLg>
                  Speedball redistributes liquidity provider (LP) fees to a DAO
                  controlled by all token holders
                </ParLg>
              </Bullet>
              <Bullet>
                <img src={BallGif} height="50px" />
                <a href="/speedball.pdf" download>
                  <DataLg>Download Whitepaper</DataLg>
                </a>
              </Bullet>
            </SimpleCol>
          </SimpleRow>

          <SectionContainer>
            <div className="text">
              <H4>LAUNCH TOKEN PRESALE</H4>
              <ParMd>
                Launch the token presale and LP formation contracts in a single
                transaction. A 48 presale window will be set up with a minimum
                goal of 3 ETH. Contributors receive non-transferable tokens
                during the presale, but can exit at any time by ragequtting
                tokens in return for contributed ETH minus fees.
              </ParMd>
              <ParMd>
                Less than 1% fee on presales contributes to the protocol's
                treasury. A 9% fee acts as a deposit to ensure commitment. If a
                presale does not meet its goal or a participant exits early,
                these fees are deposited into a rewards pool for future
                presales.
              </ParMd>
            </div>
            <div className="image">
              <img src={BallGif} height="300px" />
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="image">
              <img src={BallGif} height="300px" />
            </div>
            <div className="text">
              <H4>FORM LP</H4>
              <ParMd>
                If the goal is met, the token becomes transferable and an
                equivalent amount of tokens is minted alongside pooled funds to
                form a liquidity pair on Uniswap V3.
              </ParMd>
              <ParMd>
                Reward funds are added into the LP at launch, creating a higher
                initial price than the presale, rewarding participants and
                introducing volatility in the market.
              </ParMd>
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="text">
              <H4>DAO</H4>
              <ParMd>
                Each token has governance over a DAO treasury. 1% liquidity pool
                fees are directed to the DAO treasury, funding community
                initiatives.
              </ParMd>
              <ParMd>
                Participants have the freedom to exit by burning tokens,
                receiving a proportional share of the accumulated LP fees.
                Alternatively, tokens can be sold into the LP and not burnt.
              </ParMd>
            </div>
            <div className="image">
              <img src={BallGif} height="300px" />
            </div>
          </SectionContainer>
          <SectionContainer>
            <div className="image">
              <img src={BallGif} height="300px" />
            </div>
            <div className="text">
              <H4>BALLER HIGHLIGHTS</H4>
              <ParMd>
                Fully On-chain: The entire process is executed on-chain,
                ensuring transparency and security.
              </ParMd>
              <ParMd>
                Hyperstructure DAO: The protocol itself will be governed by a
                DAO using the same launch mechanism and will manage reward
                distribution schedules.
              </ParMd>

              <a href="/speedball.pdf" download>
                <DataXl>Download whitepaper for more</DataXl>
              </a>
            </div>
          </SectionContainer>
        </div>
      </WideColumnLayout>
    </>
  );
};

export default About;

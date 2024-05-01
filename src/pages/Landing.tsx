
import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import { BiColumnLayout, Button, Link, ParSm } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { supportedNetorks } from "../main";
import { ADMIN_URL } from "../utils/constants";
import { UserDaos } from "../components/UserDaos";

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


  return (
    <>
      {chainId && chainId in supportedNetorks ? (
        <BiColumnLayout
          subtitle="Welcome to the DIN summoner"
          title="MEME YEETER - Decentralized Meme Factory"
          left={(
            <div>
              <h1>Create a meme yeeter</h1>
              <p>
                Start with a 24 hr open presale, if the threshold is met the meme will be minted and the presale will close. 
                If the threshold is not met the presale will close and contributors can ragequit. If the meme is minted, 
                a univ3 LP is started and the meme will be available for purchase on the marketplace. 
                Welcome to fully dilluted, unruggable, fair launch yeeter memes.
              </p>
              <LinkButton to="/summon/topic">
                <Button variant="outline">Summon a Meme</Button>
              </LinkButton>
            </div>
          )}
          right={(
            <div>

              <UserDaos />

              <ExternalLinkButton
                showExternalIcon={true}
                target="_blank"
                href={`${ADMIN_URL}`}
              >

                <ParSm>Continue To Topic List</ParSm>
              </ExternalLinkButton>
            </div>
          )}
        />

      ) :
        (
          <div>
            {!isConnected && (<><h1>Not Connected</h1>
              <p>
                Please connect your wallet to continue.
              </p>
            </>
            )}
            {isConnected && (
              <h1>Unsupported Network. Switch to sepolia</h1>
            )}
            <ExternalLinkButton
              showExternalIcon={true}
              target="_blank"
              href={`${ADMIN_URL}`}
            >
              Continue To Topic List
            </ExternalLinkButton>
          </div>)
      }

    </>

  );
};

export default Landing;

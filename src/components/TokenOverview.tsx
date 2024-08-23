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
} from "@daohaus/ui";
import { BigH1Blue } from "./Layout/Layout";
import {
  formatLootForMin,
  formatMinContribution,
} from "../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.card.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
  max-width: 500px;
`;

const DetailItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledDialogContent = styled(DialogContent)`
  z-index: 10;
`;

export const SimpleRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const SimpleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const TokenOverview = ({
  yeeterId,
  daoId,
  daoChain,
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
}) => {

  // mock metadata and yeeter

  const metadata = {
    name: "Test Token",
    description: "This is a test token",
    avatarImg: "https://via.placeholder.com/150",
  };

  const yeeter = {
    dao: {
      shareTokenSymbol: "TEST",
    },
    startTime: "1631222400",
    endTime: "1631222400",
  };

  if (!metadata || !yeeter) {
    return;
  }

  return (
    <div>
      <Container>
        <BigH1Blue>{yeeter.dao.shareTokenSymbol}</BigH1Blue>
        <Avatar
          alt={metadata.name}
          fallback="token avatar"
          size="35rem"
          src={metadata.avatarImg}
        />
      </Container>
      <DetailsContainer>
        <DetailItem>
          <ParLg>{metadata.name}</ParLg>
          <ParMd>{metadata.description}</ParMd>
        </DetailItem>
        <DetailItem>
          <Label>Presale Duration</Label>
          <ParMd>
            {formatShortDateTimeFromSeconds(yeeter.startTime)} -{" "}
            {formatShortDateTimeFromSeconds(yeeter.endTime)}
          </ParMd>
        </DetailItem>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" style={{ marginTop: "2rem" }} variant="outline">
              SHARE
            </Button>
          </DialogTrigger>
          <StyledDialogContent title="Share this token">
            <SimpleRow>
              <Button size="md" variant="outline">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Check out the ${metadata.name} / ${yeeter.dao.shareTokenSymbol} token here: ${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  𝕏
                </a>
              </Button>
              <Button size="md" variant="outline" disabled={true}>
                Warpcast Frame (Coming Soon)
              </Button>
              <CopyToClipboardButton
                textToCopy={`Check out the ${metadata.name} / ${yeeter.dao.shareTokenSymbol} token here: ${window.location.href}`}
              />
            </SimpleRow>
          </StyledDialogContent>
        </Dialog>
      </DetailsContainer>
    </div>
  );
};

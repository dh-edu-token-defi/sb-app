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
import { BigH1Blue } from "../Layout/Layout";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { formatShortDateTimeFromSeconds } from "@daohaus/utils";
import { CopyToClipboardButton } from "../CopyToClipboardButton";

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

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3rem;
  margin-top: 3rem;
`;

export const OldTokenOverview = ({
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
    <Wrapper>
      <DetailsContainer>
      <BigH1Blue>{yeeter.dao.shareTokenSymbol}</BigH1Blue>

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
        <Actions>
          <Button size="lg" variant="ghost">Thing 1</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="ghost">
                SHARE
              </Button>
            </DialogTrigger>
            <StyledDialogContent title="Share this token">
              <SimpleRow>
                <Button size="md" variant="ghost">
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
        </Actions>
      </DetailsContainer>

      

    </Wrapper>
  );
};

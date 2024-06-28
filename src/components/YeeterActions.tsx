import styled from "styled-components";
import { Button } from "@daohaus/ui";
import { YeeterItem } from "../utils/types";
import BuyButton from "./BuyButton";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfileYeeter, useYeeter } from "../hooks/useYeeter";
import ExecuteLPButton from "./ExecuteLPButton";
import ExitButton from "./ExitButton";
import SwapButton from "./SwapButton";
import { useDHConnect } from "@daohaus/connect";
import { useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useDaoData } from "../hooks/useDaoData";
import CloseCampaignButton from "./CloseCampaignButton";
import CommentButton from "./CommentButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeeterActions = ({
  yeeterId,
  daoChain,
  daoId,
}: {
  yeeterId: string;
  daoChain: ValidNetwork;
  daoId: string;
}) => {
  const { address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });
  const { member } = useDaoMember({ daoId, daoChain, memberAddress: address });

  const { metadata, yeeter } = useYeeter({
    daoId: daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });
  const { marketMakerShaman, canExecute, executed, goalAchieved } =
    useMarketMaker({
      daoId,
      yeeterShamanAddress: yeeterId,
      chainId: daoChain,
      daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
    });

  if (!metadata || !yeeter || !dao || !marketMakerShaman) {
    return null;
  }
  return (
    <>
      <Container>
        {yeeter.isActive && (
          <BuyButton
            daoChain={daoChain}
            daoId={daoId}
            yeeterId={yeeterId}
            context="details"
            tokenSymbol={yeeter.dao.shareTokenSymbol}
          />
        )}
        {/* only durring presale if member */}
        {(yeeter.isActive && Number(member?.shares) > 0) ||
          (!yeeter.isActive &&
            Number(member?.shares) > 0 &&
            !yeeter.reachedGoal && (
              <ExitButton
                daoChain={daoChain}
                yeeterId={yeeterId}
                daoId={daoId}
              />
            ))}
        {/* only after presale if successfull and not executed */}
        {yeeter.reachedGoal && canExecute && (
          <ExecuteLPButton
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />
        )}
        {!goalAchieved && canExecute && (
          <CloseCampaignButton
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />
        )}
        {/* only if a token holder */}

        {member && Number(member?.shares) > 0 && (
          <CommentButton
            daoChain={daoChain}
            daoId={daoId}
            yeeterId={yeeterId}
          />
        ) }
        {/* show/hide logic in buton */}
        {goalAchieved && executed && (
          <SwapButton daoChain={daoChain} daoId={daoId} yeeterId={yeeterId} />
        )}
        {/* always */}
        {Number(member?.shares) > 0 && executed && <Button>DAO</Button>}
        <Button size="lg" style={{ marginTop: "2rem" }} variant="outline">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Check out the ${metadata.name} / ${yeeter.dao.shareTokenSymbol} token here: ${window.location.href}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            share
          </a>
        </Button>{" "}

      </Container>
    </>
  );
};

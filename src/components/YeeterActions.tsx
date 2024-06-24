import styled from "styled-components";
import { Button } from "@daohaus/ui";
import { YeeterItem } from "../utils/types";
import BuyButton from "./BuyButton";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfileYeeter, useYeeter } from "../hooks/useYeeter";
import ExitButton from "./ExitButton";
import ExecuteEscrowButton from "./ExecuteEscrowButton";
import SellerApprovalButton from "./SellerApprovalButton";
import { useEscrow } from "../hooks/useEscrow";
import { useDHConnect } from "@daohaus/connect";
import { useDaoData, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useEffect, useState } from "react";

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
  const { nftEscrowShaman, canExecute, executed, seller } = useEscrow({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });


  if (!metadata || !yeeter || !dao || !nftEscrowShaman) {
    return null;
  }

  return (
    <>
      <Container>

        {yeeter.isActive && (<BuyButton
          daoChain={daoChain}
          daoId={daoId}
          yeeterId={yeeterId}

        />)}
        {/* only durring presale if member */}
        {(yeeter.isActive && Number(member?.shares) > 0) ||
          (!yeeter.isActive && Number(member?.shares) > 0 && !yeeter.reachedGoal) &&
          (<ExitButton
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />)}
        {/* only after presale if successfull and not executed */}
        {yeeter.reachedGoal && canExecute && (<ExecuteEscrowButton
          daoChain={daoChain}
          yeeterId={yeeterId}
          daoId={daoId}
        />)}
        {/* only if not approved and not executed */}
        {((seller == address && !executed) ||
          (yeeter.isEnded && yeeter.reachedGoal && seller == address && !executed)) &&
          (<SellerApprovalButton
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />)}
        {/* always */}
        {Number(member?.shares) > 0 && executed && (<Button>DAO</Button>)}
        <Button>Share</Button>

          

      </Container>
    </>
  );
};

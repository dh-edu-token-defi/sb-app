import styled from "styled-components";
import { Button } from "@daohaus/ui";
import { YeeterItem } from "../utils/types";
import BuyButton from "./BuyButton";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfileYeeter, useYeeter } from "../hooks/useYeeter";
import ExecuteLPButton from "./ExecuteLPButton";
import ExitButton from "./ExitButton";
import { useDHConnect } from "@daohaus/connect";
import { useDaoData, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useMarketMaker } from "../hooks/useMarketMaker";

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
  const { marketMakerShaman, canExecute, executed} = useMarketMaker({
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
        {yeeter.reachedGoal && canExecute && (<ExecuteLPButton
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

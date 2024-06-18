import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeeterDetails = ({
  yeeterId,
  daoId,
  daoChain,
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
}) => {
  const { dao } = useDaoData({ daoId, daoChain });
  const { metadata, yeeter } = useYeeter({
    daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  const { marketMakerShaman, canExecute, uniswapUrl } = useMarketMaker({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });

  return (
    <>
      <Container>
        <div>
          <p>yeeter data</p>
          <pre>{JSON.stringify(yeeter, null, 2)}</pre>
          <p>marketMakerShaman: {marketMakerShaman}</p>
          <p>canExecute: {canExecute ? "yes" : "no"}</p>
          <p>uniswapUrl: {uniswapUrl}</p>
        </div>
        <div>
          <p>metadata</p>

          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      </Container>
    </>
  );
};

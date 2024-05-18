import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";

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
  const { metadata, yeeter } = useYeeter({
    daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  return (
    <>
      <Container>
        <div>
          <p>yeeter data</p>
          <pre>{JSON.stringify(yeeter, null, 2)}</pre>
        </div>
        <div>
          <p>metadata</p>

          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      </Container>
    </>
  );
};

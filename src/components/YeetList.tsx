import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useYeets } from "../hooks/useYeets";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeetList = ({
  yeeterId,
  daoChain,
}: {
  yeeterId: string;
  daoChain: ValidNetwork;
}) => {
  const { yeets } = useYeets({
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  return (
    <>
      <Container>
        <div>
          <pre>{JSON.stringify(yeets, null, 2)}</pre>
        </div>
      </Container>
    </>
  );
};

import styled from "styled-components";
import { Button } from "@daohaus/ui";
import { YeeterItem } from "../utils/types";
import BuyButton from "./BuyButton";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfileYeeter } from "../hooks/useYeeter";
import ExitButton from "./ExitButton";
import ExecuteEscrowButton from "./ExecuteEscrowButton";

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
  return (
    <>
      <Container>
      <BuyButton 
            daoChain={daoChain}
            daoId={daoId}
            yeeterId={yeeterId}
            
          />
      <ExitButton 
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />
      <ExecuteEscrowButton
            daoChain={daoChain}
            yeeterId={yeeterId}
            daoId={daoId}
          />
        <Button>Seller Approval</Button>

        <Button>Share</Button>
      </Container>
    </>
  );
};

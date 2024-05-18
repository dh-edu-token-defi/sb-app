import styled from "styled-components";
import { Button } from "@daohaus/ui";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeeterActions = ({}: {}) => {
  return (
    <>
      <Container>
        <Button>Yeet</Button>
        <Button>Exit</Button>
        <Button>Execute LP</Button>
        <Button>Swap</Button>
        <Button>Share</Button>
      </Container>
    </>
  );
};

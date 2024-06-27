import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Button, H3, Link, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 5rem;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const Success = () => {
  const { daoId } = useParams();
  const { chainId } = useDHConnect();

  return (
    <SingleColumnLayout>
      <ButtonContainer>
        <H3 style={{ marginBottom: "3rem" }}>You summoned A meme.</H3>

        <Button color="secondary" fullWidth>
          <LinkButton showExternalIcon={true} target="_blank" href={``}>
            Details
          </LinkButton>
        </Button>
      </ButtonContainer>
    </SingleColumnLayout>
  );
};

export default Success;

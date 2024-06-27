import styled from "styled-components";
import { Button, H3, Link, SingleColumnLayout } from "@daohaus/ui";

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

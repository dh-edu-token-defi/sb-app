import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Button, H3, Link, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { ADMIN_URL } from "../utils/constants";

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
        <H3 style={{ marginBottom: "3rem" }}>You summoned your DAO.</H3>
        <Button color="secondary" fullWidth>
          <LinkButton
            showExternalIcon={true}
            target="_blank"
            href={`${ADMIN_URL}/#/molochv3/${chainId}/${daoId}/activate`}
          >
            Activate Page
          </LinkButton>
        </Button>
        <Button color="secondary" fullWidth>
          <LinkButton
            showExternalIcon={true}
            target="_blank"
            href={`${ADMIN_URL}/#/molochv3/${chainId}/${daoId}/settings`}
          >
            DAO Settings
          </LinkButton>
        </Button>
      </ButtonContainer>
    </SingleColumnLayout>
  );
};

export default Success;

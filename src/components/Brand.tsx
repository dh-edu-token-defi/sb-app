import { styled } from "styled-components";
import { H2, H3, H5 } from "@daohaus/ui";
import { Link } from "react-router-dom";

import ShipImg from "../assets/ship-trans.png";
import { APP_NAME } from "../utils/constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 800px) {
    gap: 1rem;
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: unset;
  text-decoration: unset;
  &:hover {
    color: unset;
  }
`;

export const Brand = () => {
  return (
    <Container>
      <BrandLink to="/">
        <img src={ShipImg} height="100px" />
        <H2>{APP_NAME}</H2>
      </BrandLink>
    </Container>
  );
};

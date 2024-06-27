import { styled } from "styled-components";
import { H2, H3, H5, widthQuery } from "@daohaus/ui";
import { Link } from "react-router-dom";

import BallGif from "../assets/ball-gif.gif";
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

const BrandH2 = styled(H2)`
  @media ${widthQuery.sm} {
    font-size: 3rem;
  }
`;

export const Brand = () => {
  return (
    <Container>
      <BrandLink to="/">
        <img src={BallGif} height="100px" />
        <BrandH2>{APP_NAME}</BrandH2>
      </BrandLink>
    </Container>
  );
};

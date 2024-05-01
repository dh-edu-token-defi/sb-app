import { styled } from "styled-components";
import { H5 } from "@daohaus/ui";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  @media (max-width: 800px) {
    gap: 1rem;
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
        <H5>MEME SUMMONER</H5>
      </BrandLink>
    </Container>
  );
};

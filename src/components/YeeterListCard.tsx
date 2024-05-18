import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { ButtonRouterLink } from "./ButtonRouterLink";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeeterListCard = ({ yeeterData }: { yeeterData: YeeterItem }) => {
  const { metadata, yeeter } = useYeeter({
    daoId: yeeterData.dao.id,
    shamanAddress: yeeterData.id,
    chainId: DEFAULT_CHAIN_ID,
    yeeterData,
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
      <ButtonRouterLink
        to={`/molochv3/${DEFAULT_CHAIN_ID}/${yeeterData.dao.id}/${yeeterData.id}`}
      >
        YEET
      </ButtonRouterLink>
    </>
  );
};

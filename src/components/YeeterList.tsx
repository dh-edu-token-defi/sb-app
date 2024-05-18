import styled from "styled-components";
import { YeeterItem } from "../utils/types";
import { YeeterListCard } from "./YeeterListCard";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const YeeterList = ({ yeeters }: { yeeters: YeeterItem[] }) => {
  return (
    <ListContainer>
      {yeeters.map((yeeter) => (
        <YeeterListCard yeeterData={yeeter} key={yeeter.id} />
      ))}
    </ListContainer>
  );
};

import { DialogContent } from "@daohaus/ui";
import styled from "styled-components";


export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;



export const DetailItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;

`;

export const DetailItemBg = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: rgba(0, 0, 0, 0.4);

`;

export const StyledDialogContent = styled(DialogContent)`
  z-index: 10;
`;

export const SimpleRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const SimpleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;

  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 3rem;
  margin-top: 3rem;
`;

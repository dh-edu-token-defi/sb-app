import { H1, LinkStyles } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Spacer = styled.div`
  margin: 3rem 0 3rem 0;
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

export const BigH1Blue = styled(H1)`
  font-size: 20rem;
  line-height: 12rem;
  color: ${({ theme }) => theme.secondary.step11};
  word-break: break-all;
`;

export const BigH1 = styled(H1)`
  font-size: 20rem;
  line-height: 12rem;
  word-break: break-all;
`;

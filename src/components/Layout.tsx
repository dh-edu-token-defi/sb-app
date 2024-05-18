import { LinkStyles } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const StyledRouterLink = styled(RouterLink)`
  ${LinkStyles}
`;

export const Spacer = styled.div`
  margin: 3rem 0 3rem 0;
`;

import { styled } from "styled-components";
import { YeeterItem } from "../utils/types";
import { Badge } from "@daohaus/ui";

const BadgeContainer = styled.div`
  /* position: absolute;
  top: 10px;
  left: 10px; */
  display: flex;
  flex-direction: column;
`;

const StyledBadge = styled(Badge)`
  border-radius: 0px;
  border-color: black;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.secondary.step10};
  p {
    font-family: "Syne Mono", monospace;
  }
`;

export const StatusFlag = ({ yeeter }: { yeeter?: YeeterItem }) => {
  return (
    <BadgeContainer>
      {yeeter?.isComingSoon && (
        <StyledBadge
          className="comingSoon"
          badgeLabel="coming soon"
          badgeSize="sm"
        />
      )}
      {yeeter?.isEndingSoon && (
        <StyledBadge
          className="endingSoon"
          badgeLabel="ending soon"
          badgeSize="sm"
        />
      )}

      {yeeter?.isNew && (
        <StyledBadge className="new" badgeLabel="new" badgeSize="sm" />
      )}
    </BadgeContainer>
  );
};

import { styled, keyframes } from "styled-components";
import { YeeterItem } from "../utils/types";
import { Badge } from "@daohaus/ui";

const tiltShake = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  75% { transform: translateX(5px) }
  100% { transform: translateX(0) }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${tiltShake} 0.3s infinite;
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

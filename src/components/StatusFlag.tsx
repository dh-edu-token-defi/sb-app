import { styled } from "styled-components";
import { YeeterItem } from "../utils/types";
import { Badge } from "@daohaus/ui";

const BadgeContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const StyledBadge = styled(Badge)`
 p {
    font-family: "Syne Mono", monospace;
    }

  &.comingSoon {
    background-color: ${({ theme }) => theme.success.step5};
  }
  &.endingSoon {
      background-color: ${({ theme }) => theme.danger.step5};
  }
  &.new {
      background-color: ${({ theme }) => theme.info.step5};
  }
`;



export const StatusFlag = ({ yeeter }: { yeeter?: YeeterItem }) => {

    console.log("yeeter from badge", yeeter);
    return (
        <BadgeContainer>
            {yeeter?.isComingSoon && <StyledBadge className="comingSoon" badgeLabel="⏰ coming soon" badgeSize="lg" />}
            {yeeter?.isEndingSoon && <StyledBadge className="endingSoon" badgeLabel="🚩 ending soon" badgeSize="lg" />}
            {yeeter?.isNew && <StyledBadge className="new" badgeLabel="⭐ new" badgeSize="lg" />}
        </BadgeContainer>
    );
};

import styled from "styled-components";
import { useYeeter } from "../hooks/useYeeter";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import { Card, DataLg, ParMd, ParSm, ParXl } from "@daohaus/ui";

import RobotArm from "../assets/robot-hand-yellow.png";
import { SimpleCol } from "./Layout";
import { formatValueTo, fromWei } from "@daohaus/utils";
import { calcPercToGoal } from "../utils/yeetDataHelpers";

const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
`;

const DataCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TokenNameParXl = styled(ParXl)`
  font-size: 4.5rem;
  line-height: normal;
`;

export const YeeterListCard = ({ yeeterData }: { yeeterData: YeeterItem }) => {
  const { metadata, yeeter } = useYeeter({
    daoId: yeeterData.dao.id,
    shamanAddress: yeeterData.id,
    chainId: DEFAULT_CHAIN_ID,
    yeeterData,
  });

  if (!metadata || !yeeter) return null;

  console.log("yeeter", yeeter);

  return (
    <Card>
      <TopSectionContainer>
        <div>
          {metadata.avatarImg && metadata.avatarImg !== "" ? (
            <img src={metadata.avatarImg} height="100px" />
          ) : (
            <img src={RobotArm} height="100px" />
          )}
        </div>
        <DataCol>
          <TokenNameParXl>{metadata.name}</TokenNameParXl>
          <ParMd>
            {`${formatValueTo({
              value: fromWei(yeeter.safeBalance.toString()),
              decimals: 5,
              format: "number",
            })} ETH Raised`}
          </ParMd>
          <ParMd>{calcPercToGoal(yeeter)} To Goal</ParMd>
        </DataCol>
      </TopSectionContainer>
    </Card>
  );
};

// <Container>
// <div>
//   <p>yeeter data</p>
//   <pre>{JSON.stringify(yeeter, null, 2)}</pre>
// </div>
// <div>
//   <p>metadata</p>

//   <pre>{JSON.stringify(metadata, null, 2)}</pre>
// </div>
// </Container>
// <ButtonRouterLink
// to={`/molochv3/${DEFAULT_CHAIN_ID}/${yeeterData.dao.id}/${yeeterData.id}`}
// >
// YEET
// </ButtonRouterLink>

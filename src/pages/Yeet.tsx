import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { H4, widthQuery } from "@daohaus/ui";
import { useCurrentYeeter } from "../contexts/CurrentYeeterContext";
import { YeetList } from "../components/YeetList";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";
import styled from "styled-components";
import { TokenOverview } from "../components/TokenOverview";
import { PresalePhase } from "../components/PresalePhase";

const ColumnContainer = styled.div`
  width: 100%;
  .split {
    display: flex;
    flex-direction: row;
    gap: 5rem;
    @media ${widthQuery.md} {
      flex-direction: column;
    }
    .div {
      display: flex;
      flex-direction: column;
    }
  }
  @media ${widthQuery.sm} {
    padding: 2rem 0;
    margin-top: 3rem;
  }
`;

export function Yeet() {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  return (
    <WideColumnLayout>
      {shamanAddress && daoId && daoChain && (
        <ColumnContainer>
          <div className="split">
            <div>
              <TokenOverview
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              />
            </div>
            <div>
              <PresalePhase
                yeeterId={shamanAddress}
                daoId={daoId}
                daoChain={daoChain}
              />

              {shamanAddress && daoChain && (
                <YeetList
                  daoId={daoId}
                  yeeterId={shamanAddress}
                  daoChain={daoChain}
                />
              )}
            </div>
          </div>
        </ColumnContainer>
      )}
    </WideColumnLayout>
  );
}

export default Yeet;

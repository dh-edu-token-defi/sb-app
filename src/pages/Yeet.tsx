import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { H4, SingleColumnLayout } from "@daohaus/ui";
import { useCurrentYeeter } from "../contexts/CurrentYeeterContext";
import { Spacer } from "../components/Layout";
import { YeeterDetails } from "../components/YeeterDetails";
import { YeeterActions } from "../components/YeeterActions";
import { YeetList } from "../components/YeetList";

export function Yeet() {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  return (
    <SingleColumnLayout>
      <Spacer>
        <H4>Details</H4>
        {shamanAddress && daoId && daoChain && (
          <YeeterDetails
            yeeterId={shamanAddress}
            daoId={daoId}
            daoChain={daoChain}
          />
        )}
      </Spacer>
      <Spacer>
        <H4>Actions</H4>
        <YeeterActions />
      </Spacer>
      <Spacer>
        <H4>Yeets</H4>
        {shamanAddress && daoChain && (
          <YeetList yeeterId={shamanAddress} daoChain={daoChain} />
        )}
      </Spacer>
    </SingleColumnLayout>
  );
}

export default Yeet;

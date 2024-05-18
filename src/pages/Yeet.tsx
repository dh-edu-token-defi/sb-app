import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { useCurrentYeeter } from "../contexts/CurrentYeeterContext";

export function Yeet() {
  const { daoChain, daoId } = useCurrentDao();
  const { shamanAddress } = useCurrentYeeter();

  return (
    <SingleColumnLayout>
      <p>yeet details</p>
    </SingleColumnLayout>
  );
}

export default Yeet;

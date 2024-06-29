import { useParams } from "react-router-dom";
import { Buildable, Field } from "@daohaus/ui";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { ToWeiInput } from "@daohaus/form-builder";

export const LabeledToWeiInput = (props: Buildable<Field>) => {
  const { daoChain } = useParams();

  const networkData = HAUS_NETWORK_DATA[daoChain as ValidNetwork] ?? {
    symbol: "ETH",
  };

  return (
    <ToWeiInput {...props} label={`${props.label} (${networkData.symbol})`} />
  );
};

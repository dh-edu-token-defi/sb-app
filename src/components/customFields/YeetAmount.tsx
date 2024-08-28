import {
  ignoreEmptyVal,
  isNumberish,
  toBaseUnits,
  ValidateField,
} from "@daohaus/utils";
import { Buildable, Field, WrappedInput } from "@daohaus/ui";
import { RegisterOptions } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { formatMinContribution } from "../../utils/yeetDataHelpers";

import { useYeeter } from "../../hooks/useYeeter";
import { useMemo } from "react";

export const YeetAmount = (props: Buildable<Field>) => {
  const { daoId, daoChain } = useParams();
  const { shamanAddress } = useCurrentYeeter();
  const memoizedShamanAddress = useMemo(() => shamanAddress, [shamanAddress]);

  const { minTribute } = useYeeter({ chainId: daoChain as ValidNetwork, daoId: daoId, shamanAddress: memoizedShamanAddress });

  const memoizedMinTribute = useMemo(() => minTribute, [minTribute]);

  if(!memoizedMinTribute) return null;

  const newRules: RegisterOptions = {
    ...props.rules,
    setValueAs: (val: string) => (isNumberish(val) ? toBaseUnits(val) : val),
    validate: (val) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ignoreEmptyVal(val, (val: any) => {
        if (!shamanAddress) return "invalid form placement";

        const validNumber = ValidateField.number(val);
        if (validNumber === true) {
          return Number(memoizedMinTribute) <= Number(val)
            ? true
            : `Must yeet alteast ${formatMinContribution(memoizedMinTribute)} ETH`;
        }
        return validNumber;
      }),
  };

  const networkData = HAUS_NETWORK_DATA[daoChain as ValidNetwork] ?? {
    symbol: "ETH",
  };

  return (
    <WrappedInput
      {...props}
      rules={newRules}
      defaultValue="0"
      label={`${props.label} (${networkData.symbol})`}
    />
  );
};
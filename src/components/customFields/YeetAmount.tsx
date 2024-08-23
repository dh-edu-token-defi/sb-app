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
  import { DEFAULT_CHAIN_ID } from "../../utils/constants";
import { YeeterActions } from "../YeeterActions";
import { YeeterItem } from "../../utils/types";
  
  export const YeetAmount = (props: Buildable<Field>) => {
    const { daoId, daoChain } = useParams();
    const { shamanAddress } = useCurrentYeeter();
  
    // mock yeeter

    // export type YeeterItem = {
    //   id: string;
    //   createdAt: string;
    //   dao: {
    //     id: string;
    //     shareTokenSymbol: string;
    //   };
    //   balance: string;
    //   safeBalance: string;
    //   endTime: string;
    //   startTime: string;
    //   isShares: boolean;
    //   multiplier: string;
    //   minTribute: string;
    //   goal: string;
    //   yeetCount: string;
    //   isActive: boolean;
    //   isEnded: boolean;
    //   isComing: boolean;
    //   isComingSoon: boolean;
    //   isEndingSoon: boolean;
    //   isNew: boolean;
    //   reachedGoal: boolean;
    //   vault: string;
    //   timeRemaining: string;
    // };

    const yeeter: YeeterItem = {
      id: "0",
      createdAt: "0",
      dao: {
        id: "0",
        shareTokenSymbol: "YTR",
      },
      balance: "0",
      safeBalance: "0",
      endTime: "0",
      startTime: "0",
      isShares: false,
      multiplier: "0",
      minTribute: "0.1",
      goal: "0",
      yeetCount: "0",
      isActive: true,
      isEnded: false,
      isComing: false,
      isComingSoon: false,
      isEndingSoon: false,
      isNew: false,
      reachedGoal: true,
      vault: "0",
      timeRemaining: "0",
    };
    

    const newRules: RegisterOptions = {
      ...props.rules,
      setValueAs: (val: string) => (isNumberish(val) ? toBaseUnits(val) : val),
      validate: (val) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ignoreEmptyVal(val, (val: any) => {
          if (!yeeter) return "invalid form placement";
  
          const validNumber = ValidateField.number(val);
          if (validNumber === true) {
            return Number(yeeter.minTribute) <= Number(val)
              ? true
              : `Must yeet alteast ${formatMinContribution(yeeter)} ETH`;
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
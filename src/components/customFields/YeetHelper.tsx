import React from "react";
import { Buildable, Field, DataXs } from "@daohaus/ui";
import { useYeeter } from "../../hooks/useYeeter";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";

export const YeetHelper = (props: Buildable<Field>) => {
  const { daoId, daoChain } = useParams();
  const { shamanAddress } = useCurrentYeeter();

  const { yeeter } = useYeeter({
    chainId: daoChain as ValidNetwork,
    daoId,
    shamanAddress,
  });

  if (!yeeter) return null;

  return (
    <DataXs>
      Receive {formatLootForMin(yeeter)} tokens per{" "}
      {formatMinContribution(yeeter)}{" "}
      {HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol} contributed
    </DataXs>
  );
};
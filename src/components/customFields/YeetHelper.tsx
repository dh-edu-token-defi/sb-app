import React from "react";
import { Buildable, Field, DataXs } from "@daohaus/ui";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import {
  formatLootForMin,
  formatMinContribution,
} from "../../utils/yeetDataHelpers";
import { YeeterItem } from "../../utils/types";

export const YeetHelper = (props: Buildable<Field>) => {
  const { daoId, daoChain } = useParams();
  const { shamanAddress } = useCurrentYeeter();

  // mock yeeter
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

  if (!yeeter) return null;

  return (
    <DataXs>
      Receive {formatLootForMin(yeeter)} tokens per{" "}
      {formatMinContribution(yeeter)}{" "}
      {HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol} contributed
    </DataXs>
  );
};
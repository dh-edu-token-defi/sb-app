import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, Field, DataMd, widthQuery } from "@daohaus/ui";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { formatLootForAmount } from "../../utils/yeetDataHelpers";
import styled from "styled-components";
import { isNumberString } from "@daohaus/utils";
import { YeeterItem } from "../../utils/types";

const SpacedPar = styled(DataMd)`
  margin-top: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.input.color};

  @media ${widthQuery.sm} {
    margin-top: 0rem;
  }
`;

export const YeetReturn = (props: Buildable<Field>) => {
  const { watch } = useFormContext();

  const { daoId, daoChain } = useParams();
  const { shamanAddress } = useCurrentYeeter();
  console.log("shamanAddress", shamanAddress);

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

  const amount = watch("amount");

  const returned = useMemo(() => {
    if (!amount || !yeeter || !isNumberString(amount)) return "0";

    if (Number(yeeter.minTribute) > Number(amount)) return "0";

    return formatLootForAmount(yeeter, amount);
  }, [amount]);

  if (!yeeter) return null;

  return <SpacedPar>GET {returned} {yeeter.dao.shareTokenSymbol || "MEME"} TOKENS</SpacedPar>;
};
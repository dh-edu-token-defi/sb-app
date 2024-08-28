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
import { useYeeter } from "../../hooks/useYeeter";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

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

  const memoizedShamanAddress = useMemo(() => shamanAddress, [shamanAddress]);
  if (!daoId || !daoChain) return null;

  // console.log("shamanAddress", shamanAddress);
  const { multiplier, minTribute } = useYeeter({ chainId: daoChain as ValidNetwork, daoId: daoId, shamanAddress: memoizedShamanAddress });

  const memoizedMinTribute = useMemo(() => minTribute, [minTribute]);
  const memoizedMultiplier = useMemo(() => multiplier, [multiplier]);

  const { dao } = useDaoData({ daoId, daoChain });


  const amount = watch("amount");

  const returned = useMemo(() => {
    if (!amount || !memoizedMinTribute || !memoizedMultiplier || !isNumberString(amount)) return "0";

    if (Number(memoizedMinTribute) > Number(amount)) return "0";


    return formatLootForAmount(memoizedMultiplier, amount);
  }, [amount]);

  if (!multiplier || !memoizedMinTribute) return null;

  return <SpacedPar>GET {returned} {dao?.shareTokenSymbol} TOKENS</SpacedPar>;
};
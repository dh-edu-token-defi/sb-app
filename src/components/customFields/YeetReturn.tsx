import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, Field, DataMd, widthQuery } from "@daohaus/ui";
import { useYeeter } from "../../hooks/useYeeter";
import { useParams } from "react-router-dom";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { formatLootForAmount } from "../../utils/yeetDataHelpers";
import styled from "styled-components";
import { isNumberString } from "@daohaus/utils";

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

  const { yeeter } = useYeeter({
    chainId: daoChain as ValidNetwork,
    daoId,
    shamanAddress,
  });

  const amount = watch("amount");

  const returned = useMemo(() => {
    if (!amount || !yeeter || !isNumberString(amount)) return "0";

    if (Number(yeeter.minTribute) > Number(amount)) return "0";

    return formatLootForAmount(yeeter, amount);
  }, [amount]);

  if (!yeeter) return null;

  return <SpacedPar>GET {returned} {yeeter.dao.shareTokenSymbol || "MEME"} TOKENS</SpacedPar>;
};
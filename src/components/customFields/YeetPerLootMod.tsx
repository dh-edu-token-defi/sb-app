import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, Field, widthQuery, DataMd } from "@daohaus/ui";
import { formatLootForMinSimple } from "../../utils/yeetDataHelpers";
import styled from "styled-components";
import { isNumberString } from "@daohaus/utils";

const SpacedPar = styled(DataMd)`
  margin-top: 4rem;
  font-weight: 700;

  @media ${widthQuery.sm} {
    margin-top: 0rem;
  }
`;

export const YeetPerLootMod = (props: Buildable<Field>) => {
  const { watch, setValue } = useFormContext();

  const amount = watch("collectorPrice");
  const multiplier = watch("multiplier");

  const lootReturned = useMemo(() => {
    if (!amount || !isNumberString(amount)) return "0";

    if (!multiplier || !isNumberString(multiplier)) return "0";

    console;

    return formatLootForMinSimple(amount, multiplier);
  }, [amount, multiplier]);

  useEffect(() => {
    if (!amount || !isNumberString(amount)) return;

    if (BigInt(amount) < BigInt(10000000000000000000)) {
      setValue("multiplier", "1000000");
    } else if (BigInt(amount) < BigInt(100000000000000000000)) {
      setValue("multiplier", "100000");
    } else {
      setValue("multiplier", "10000");
    }
  }, [amount]);

  return (
    <>
      <SpacedPar>FOR {lootReturned} TOKENS</SpacedPar>
    </>
  );
};

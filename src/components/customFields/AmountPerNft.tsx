import { useFormContext } from "react-hook-form";
import { styled } from "styled-components";

import { Buildable, DataMd, Field, Label } from "@daohaus/ui";
import { formatValueTo, isNumberish, toWholeUnits } from "@daohaus/utils";
import { calcAmountPerNft } from "../../utils/summonTx";
import { useMemo } from "react";

const SupplyValue = styled(DataMd)`
  margin-top: 2.5rem;
`;

export const AmountPerNft = (props: Buildable<Field>) => {
  const { watch } = useFormContext();

  const lootTokenSupply = watch("lootTokenSupply");
  const airdropAllocation = watch("airdropAllocation");
  const maxClaims = watch("maxClaims");

  const lootPerNft = useMemo(() => {
    if (
      !isNumberish(maxClaims) ||
      !isNumberish(lootTokenSupply) ||
      !isNumberish(airdropAllocation) ||
      maxClaims === "0"
    )
      return null;

    return calcAmountPerNft({
      lootTokenSupply,
      airdropAllocation,
      maxClaims,
    });
  }, [lootTokenSupply, airdropAllocation, maxClaims]);

  return (
    <div>
      <Label>Meme token airdrop per NFT</Label>
      {lootPerNft !== null ? (
        // <SupplyValue>{lootPerNft.toString()}</SupplyValue>
        <SupplyValue>
          {formatValueTo({
            value: toWholeUnits(lootPerNft.toString(), 18),
            decimals: 2,
            format: "number",
          })}
        </SupplyValue>
      ) : (<SupplyValue>--</SupplyValue>)}
    </div>
  );
};

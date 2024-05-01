import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, WrappedInput, Field } from "@daohaus/ui";
import { EthAddress, isEthAddress } from "@daohaus/utils";

import { fetchNftContractMetadata } from "../../utils/sequenceHelper";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";

export const NftAddress = (props: Buildable<Field>) => {
  const { watch } = useFormContext();
  const { chainId } = useDHConnect();
  const [nftData, setNftData] = useState<{
    name?: string;
    deployed?: boolean;
  }>();

  const nftContractAddress = watch("nftContractAddress");

  useEffect(() => {
    const getMeta = async (nftContractAddress: EthAddress) => {
      const meta = await fetchNftContractMetadata({
        nftContractAddress,
        chainId: chainId as ValidNetwork,
      });

      setNftData({
        name: meta.contractInfoMap[nftContractAddress.toLowerCase()]?.name,
        deployed:
          meta.contractInfoMap[nftContractAddress.toLowerCase()]?.deployed,
      });
    };

    if (isEthAddress(nftContractAddress) && chainId) {
      getMeta(nftContractAddress);
    }
  }, [nftContractAddress, chainId]);

  return (
    <WrappedInput
      {...props}
      helperText={
        nftData?.name && nftData?.deployed
          ? `NFT Collection Found: ${nftData.name}`
          : ""
      }
      warning={
        nftData && !nftData.deployed
          ? {
              type: "warning",
              message: "Cannot find this NFT Collection",
            }
          : undefined
      }
    />
  );
};

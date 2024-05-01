import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable,  Field } from "@daohaus/ui";

import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";
import { calculateShamanAddress } from "../../utils/summonTx";

export const ShamanAddress = (props: Buildable<Field>) => {
  const { watch, setValue } = useFormContext();
  const { chainId } = useDHConnect();

  const saltNonce = watch("saltNonce");

  useEffect(() => {
    const getShamanAddress = async () => {
      
      const shamanAddress = await calculateShamanAddress(saltNonce, chainId as ValidNetwork);
      console.log("****setting shaman address", shamanAddress);
      setValue(props.id, shamanAddress);

    };

    if (saltNonce && chainId) {
      console.log("****getting saltNonce to get shaman", saltNonce);
      getShamanAddress();
    }
  }, [saltNonce, chainId]);

  

  return null;
};

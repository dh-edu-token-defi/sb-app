import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, WrappedInput, Field } from "@daohaus/ui";
import { EthAddress, isEthAddress } from "@daohaus/utils";

import { fetchNftContractMetadata } from "../../utils/sequenceHelper";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";
import { calculateDAOAddress } from "../../utils/summonTx";
import { SafeInfo, fetchSafe } from "../../utils/safes";
import { IFindQueryResult } from "@daohaus/data-fetch-utils";

export const DAOAddress = (props: Buildable<Field>) => {
  const { watch, setValue } = useFormContext();
  const { chainId } = useDHConnect();

  const saltNonce = watch("saltNonce");
  console.log("saltNonce >>>>>>", props.id, saltNonce);
  

  useEffect(() => {

    const getDAOAddress = async () => {
      if (!saltNonce || !chainId) return;
      const daoAddress = await calculateDAOAddress(saltNonce, chainId as ValidNetwork);
      console.log("daoAddress >>>>>>", props.id, daoAddress);
      setValue(props.id, daoAddress.toLowerCase());
    };


    if (saltNonce && chainId) {
      getDAOAddress();
    }
  }, [saltNonce, chainId]);

  

  return null;
};

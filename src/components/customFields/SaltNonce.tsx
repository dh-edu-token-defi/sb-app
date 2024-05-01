import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, WrappedInput, Field } from "@daohaus/ui";
import { EthAddress, getNonce, isEthAddress } from "@daohaus/utils";

export const SaltNonce = (props: Buildable<Field>) => {
  const { setValue } = useFormContext();


  useEffect(() => {
    setValue(props.id, getNonce());
    
  }, []);

  return null;
};

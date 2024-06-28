import { Buildable,  ParMd } from "@daohaus/ui";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";



export const CreatedAtField = (props: Buildable<object>) => {
  const { setValue } = useFormContext();


  useEffect(() => {
      setValue(
        props.id,
        (Math.floor((Number(new Date()) / 1000))).toString()
      );

  }, []);


  return null;
};
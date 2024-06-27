import React, { useEffect, useState } from "react";
import { Buildable, Field, } from "@daohaus/ui";

import { EpochDatePicker } from "@daohaus/moloch-v3-fields";
import { useFormContext } from "react-hook-form";


export const DateWrapper = (props: Buildable<Field>) => {
    const { setValue, watch } = useFormContext();
    const [errorText, setErrorText] = useState<string>("");

    const selectedDate = watch(props.id);

    useEffect(() => {
        setValue(props.id, Math.floor(+(new Date()) / 1000));
    }, []);

  return (
    <>
    <EpochDatePicker id={props.id} />
    </>

  );
};
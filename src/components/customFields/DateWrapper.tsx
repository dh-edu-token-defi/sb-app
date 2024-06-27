import React, { useEffect, useState } from "react";
import { Buildable, ErrorText, Field, ParSm, } from "@daohaus/ui";

import { EpochDatePicker } from "@daohaus/moloch-v3-fields";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";



export const DateWrapper = (props: Buildable<Field>) => {
    const { setValue, watch } = useFormContext();
    const [errorText, setErrorText] = useState<string>("");

    const selectedDate = watch(props.id);

    useEffect(() => {
        setValue(props.id, Math.floor(+(new Date()) / 1000));
    }, []);


    useEffect(() => {
        console.log("selectedDate", selectedDate, Math.floor(+(new Date()) / 1000), selectedDate < Math.floor(+(new Date()) / 1000));
        if (selectedDate < Math.floor(+(new Date()) / 1000)) {
            setErrorText("This date is in the past. Please select a future date.");
        } else {
            setErrorText("");
        }
    }, [selectedDate]);

    const DateWrapperStyle = styled.div`
        border: 2px solid ${errorText ? ({ theme }) => theme.warning.step5 : "transparent"};
        padding: 8px;
    `;

  return (
    <DateWrapperStyle >
    <EpochDatePicker id={props.id} />
    {errorText && <ErrorText>{errorText}</ErrorText>}
    </DateWrapperStyle>

  );
};
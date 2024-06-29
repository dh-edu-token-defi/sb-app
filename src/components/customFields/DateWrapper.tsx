import React, { forwardRef, useEffect, useState } from "react";
import {
  Buildable,
  Button,
  ErrorText,
  Field,
  Label,
  ParLg,
  ParSm,
} from "@daohaus/ui";

import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { formatDate } from "../YeetComments";
import DatePicker from "react-datepicker";
import { RiArrowDropDownFill, RiCalendar2Fill } from "react-icons/ri";

const LabelWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DateWrapper = (props: Buildable<Field>) => {
  const { setValue, watch } = useFormContext();
  const [errorText, setErrorText] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());

  const selectedDate = watch(props.id);

  const handleChange = (date: Date) => {
    if (date) {
      setStartDate(date);
      setValue(props.id, Math.floor(+date / 1000));
    }
  };

  interface Props {
    onClick?: () => void;
    value?: string | number;
  }
  const CustomInput = forwardRef<HTMLButtonElement, Props>(
    ({ value, onClick }, ref) => (
      <Button
        IconLeft={RiCalendar2Fill}
        IconRight={RiArrowDropDownFill}
        className="custom-button-input"
        onClick={onClick}
        ref={ref}
      ></Button>
    )
  );

  useEffect(() => {
    setValue(props.id, Math.floor(+new Date() / 1000));
  }, []);

  useEffect(() => {
    if (selectedDate < Math.floor(+new Date() / 1000)) {
      setErrorText("This date is in the past. Please select a future date.");
    } else {
      setErrorText("");
    }
  }, [selectedDate]);

  const DateWrapperStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    border: 2px solid
      ${errorText ? ({ theme }) => theme.warning.step5 : "transparent"};
    padding: 8px;
  `;

  return (
    <>
      <LabelWrapper>
        <span style={{ color: "#f76808", fontSize: "2rem" }}>*</span>
        <Label>Start Date</Label>
      </LabelWrapper>
      <DateWrapperStyle>
        <DatePicker
          id={props.id}
          selected={startDate}
          // @ts-ignore
          onChange={(date: Date) => handleChange(date)}
          showTimeSelect
          customInput={<CustomInput />}
          wrapperClassName={props?.className}
          dateFormat="Pp"
        />
        <ParLg>{formatDate(selectedDate)}</ParLg>
      </DateWrapperStyle>
      {errorText && <ErrorText>{errorText}</ErrorText>}
    </>
  );
};

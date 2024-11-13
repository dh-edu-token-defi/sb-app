import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { YeeterItem } from "../utils/types";
import { YeeterListCard } from "./YeeterListCard";
import { Checkbox, DataSm, H4 } from "@daohaus/ui";

import { Dispatch, SetStateAction } from "react";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;

const TitleContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondary.step12};
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .toggle-check {
    background-color: ${(props) => props.theme.secondary.step9};
    padding: 0.5rem 1rem;
  }

  div {
    margin-bottom: 0px;
  }

  label {
    color: black;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const CarouselContainer = styled.div`
  max-width: 90vw;

  padding: 1rem 0;
`;

const ImageContainer = styled.div`
  padding: 1rem 0;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Adjust the gap as needed */
  justify-content: center; /* Center the items horizontally */
  align-items: center; /* Center the items vertically */
`;



export const YeeterGrid = ({
  yeeters,
  title,
  canToggle,
  toggle,
  setToggle,
  rtl = false,
}: {
  yeeters: YeeterItem[];
  title: string;
  canToggle?: boolean;
  toggle?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
  rtl?: boolean;
}) => {
  const handleToggle = (checked: boolean) => {
    if (!setToggle) return;
    setToggle(checked);
  };
  return (
    <>
      <TitleContainer>
        <H4 color="#000000">{title}</H4>
        {canToggle && setToggle && (
          <div className="toggle-check">
            <Checkbox title="Mine Only" onCheckedChange={handleToggle} />
          </div>
        )}
      </TitleContainer>
      <CarouselContainer>
        {yeeters.length < 1 && (
          <ImageContainer>
            <DataSm>Check back soon</DataSm>
          </ImageContainer>
        )}
        {yeeters.length > 0 && (
          <FlexContainer>
          {yeeters.map((yeeter) => (
            <YeeterListCard yeeterData={yeeter} key={yeeter.id} />
          ))}
        </FlexContainer>
        )}
      </CarouselContainer>
    </>
  );
};

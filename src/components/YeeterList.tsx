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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  smallTablet: {
    breakpoint: { max: 1200, min: 760 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 760, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const YeeterList = ({
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
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1250}
            showDots={false}
            swipeable={true}
            draggable={true}
            arrows={true}
            pauseOnHover={true}
            renderButtonGroupOutside={true}
            rtl={rtl}
            customTransition="400ms ease-in-out"
          >
            {yeeters.map((yeeter) => (
              <YeeterListCard yeeterData={yeeter} key={yeeter.id} />
            ))}
          </Carousel>
        )}
      </CarouselContainer>
    </>
  );
};

import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { YeeterItem } from "../utils/types";
import { YeeterListCard } from "./YeeterListCard";
import { Button, Checkbox, H4 } from "@daohaus/ui";

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
  max-width: 110rem;
  padding: 1rem 0;
`;

const ImageContainer = styled.div`
  padding: 1rem 0;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//     slidesToSlide: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 4,
//     slidesToSlide: 4,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 768 },
//     items: 3,
//     slidesToSlide: 3,
//   },
//   smallTablet: {
//     breakpoint: { max: 768, min: 464 },
//     items: 2,
//     slidesToSlide: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1,
//   },
// };

export const YeeterList = ({
  yeeters,
  title,
  canToggle,
  toggle,
  setToggle,
}: {
  yeeters: YeeterItem[];
  title: string;
  canToggle?: boolean;
  toggle?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
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
            <LinkButton to="/summon/token">
              <Button variant="outline" size="lg">
                Create a Token Presale
              </Button>
            </LinkButton>
          </ImageContainer>
        )}
        {yeeters.length > 0 && (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            showDots={false}
            swipeable={true}
            draggable={true}
            arrows={true}
            pauseOnHover={true}
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

import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { YeeterItem } from "../utils/types";
import { YeeterListCard } from "./YeeterListCard";
import { H4 } from "@daohaus/ui";

import NothingImg from "../assets/nothing.jpg";

const TitleContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondary.step3};
  padding: 5px 15px;
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

export const YeeterList = ({
  yeeters,
  title,
}: {
  yeeters: YeeterItem[];
  title: string;
}) => {
  return (
    <>
      <TitleContainer>
        <H4 color="#000000">{title}</H4>
      </TitleContainer>
      <CarouselContainer>
        {yeeters.length < 1 && (
          <ImageContainer>
            <img src={NothingImg} height="300px" />
          </ImageContainer>
        )}
        {yeeters.length > 0 && (
          <Carousel
            responsive={responsive}
            // infinite={true}
            // autoPlay={true}
            // autoPlaySpeed={1000}
            // showDots={true}
            swipeable={false}
            draggable={false}
            arrows={true}
          >
            {yeeters.map((yeeter) => {
              return <YeeterListCard yeeterData={yeeter} key={yeeter.id} />;
            })}
          </Carousel>
        )}
      </CarouselContainer>
    </>
  );
};

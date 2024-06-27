import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const ProgressVisualFull = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ theme }) => theme.primary.step11};
  display: flex;
  height: 5rem;
  border-radius: 20px;
  /* box-shadow: 3px 3px ${({ theme }) => theme.warning.step1}; */
`;

export const ProgressVisualPart = styled.div<{
  width: string;
  $backgroundColor: string;
}>`
  width: ${(props) => props.width};
  background-color: ${({ theme }) => theme.warning.step10};
  /* Number of the seconds for complete animation */
  transition: width 2s;
  border-radius: 19px;
`;

type ProgressProps = {
  backgroundColor: string;
  progressSection: {
    percentage: string;
    color: string;
  }[];
};

export const ProgressBar = ({
  backgroundColor,
  progressSection = [
    {
      percentage: "0%",
      color: "transparent",
    },
  ],
}: ProgressProps) => {
  // Starting values needed for the animation
  // Mapped by "progressSection" so it can work with multiple values dynamically
  const [widths, setWidths] = useState(
    progressSection.map(() => {
      return "0%";
    })
  );

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        progressSection.map((item) => {
          return item.percentage;
        })
      );
    });
  }, [progressSection]);

  return (
    <ProgressVisualFull $backgroundColor={backgroundColor}>
      {progressSection.map((item, index) => {
        return (
          <ProgressVisualPart
            key={index}
            width={widths[index]}
            $backgroundColor={item.color}
          />
        );
      })}
    </ProgressVisualFull>
  );
};

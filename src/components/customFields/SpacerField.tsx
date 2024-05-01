import React from "react";
import { Buildable, Field } from "@daohaus/ui";
import { styled } from "styled-components";

const Spacer = styled.div`
  height: 9rem;
`;

export const SpacerField = (props: Buildable<Field>) => {
  return <Spacer />;
};

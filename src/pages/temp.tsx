import styled from "styled-components";
import { DataLg, DataXl, H3, H4, ParLg, ParMd } from "@daohaus/ui";
import { APP_NAME } from "../utils/constants";
import {
  BigH1,
  SimpleCol,
  SimpleRow,
  Spacer,
} from "../components/Layout/Layout";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";

import BallGif from "../assets/ball-gif.gif";

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  width: 100%;
  padding: 2rem 0;
  .image {
    width: 20%;
  }
  .text {
    width: 60%;
    p {
      margin-bottom: 1rem;
    }
  }
`;

const Bullet = styled(SimpleRow)`
  align-items: center;
  gap: 1rem;
`;

const Temp = () => {
  return (
    <>
      <WideColumnLayout>
        <Bullet>
          <img src={BallGif} height="300px" />
          <BigH1>{APP_NAME}</BigH1>
        </Bullet>
      </WideColumnLayout>
    </>
  );
};

export default Temp;

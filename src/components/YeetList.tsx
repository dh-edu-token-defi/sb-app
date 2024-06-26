import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { DataXl, DataXs, ParXl } from "@daohaus/ui";
import { YeetsItem } from "../utils/types";
import {
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
} from "@daohaus/utils";
import { ContributorProfile } from "./ContributorProfile";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { useYeets } from "../hooks/useYeets";

export const YeetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
  margin-top: 2rem;
  min-height: 50rem;
  min-width: 30rem;
  width: 70rem;

  .nada {
    margin-top: 3rem;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const YeetListItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .profile {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .date {
    margin-top: 0.5rem;
  }
  .message {
    font-size: 16px;
    font-weight: 600;
    overflow-x: hidden;
  }
`;

export const YeetList = ({
  yeeterId,
  daoChain,
}: {
  yeeterId: string;
  daoChain: ValidNetwork;
}) => {
  const { yeets } = useYeets({
    shamanAddress: yeeterId,
    chainId: daoChain,
  });
  return (
    <YeetListContainer>
      {yeets &&
        yeets.length > 0 &&
        yeets.map((yeet: YeetsItem) => {
          return (
            <YeetListItem key={yeet.id}>
              <div className="profile">
                <ContributorProfile address={yeet.contributor} />
                <DataXl>
                  {`${formatValueTo({
                    value: fromWei(yeet.amount),
                    decimals: 3,
                    format: "numberShort",
                  })} ${HAUS_NETWORK_DATA[daoChain as ValidNetwork]?.symbol}`}
                </DataXl>
              </div>
              <div className="message">
                <ReactMarkdown className="projectDetails">
                  {yeet.message}
                </ReactMarkdown>
                <div className="date">
                  <DataXs>
                    {formatShortDateTimeFromSeconds(yeet.createdAt)}
                  </DataXs>
                </div>
              </div>
            </YeetListItem>
          );
        })}

      {(!yeets || yeets.length < 1) && (
        <div className="nada">
          <ParXl>Where's the Yeets?</ParXl>
        </div>
      )}
    </YeetListContainer>
  );
};

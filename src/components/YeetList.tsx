import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { DataLg, DataXl, DataXs } from "@daohaus/ui";
import { RagequitItem, YeetsItem } from "../utils/types";
import {
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
} from "@daohaus/utils";
import { ContributorProfile } from "./ContributorProfile";
import { HAUS_NETWORK_DATA, ValidNetwork } from "@daohaus/keychain-utils";
import { useYeets } from "../hooks/useYeets";
import { Tabs } from "./tabs/Tabs";
import { YeetComments } from "./YeetComments";
import { ContractDetails } from "./ContractDetails";
import { useRagequits } from "../hooks/useRagequits";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeter } from "../hooks/useYeeter";

const Container = styled.div`
  margin-top: 5rem;
`;

export const YeetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 0.5rem;
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

const TitleContainer = styled.div`
  width: 100%;
  padding: 5px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const YeetList = ({
  yeeterId,
  daoId,
  daoChain,
}: {
  yeeterId: string;
  daoId: string;
  daoChain: ValidNetwork;
}) => {
  const { yeets } = useYeets({
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  const { ragequits } = useRagequits({ chainId: DEFAULT_CHAIN_ID, daoId });
  const { yeeter } = useYeeter({
    daoId,
    shamanAddress: yeeterId,
    chainId: daoChain,
  });

  return (
    <Container>
      <>
        <TitleContainer>
          <Tabs
            tabList={[
              {
                label: "PRESALE BUYS",
                Component: () => (
                  <YeetListContainer>
                    {yeeter &&
                      yeets &&
                      yeets.length > 0 &&
                      yeets.map((yeet: YeetsItem) => {
                        return (
                          <YeetListItem key={yeet.id}>
                            <div className="profile">
                              <ContributorProfile address={yeet.contributor} />
                              <DataLg>
                                {`${formatValueTo({
                                  value: fromWei(yeet.amount),
                                  decimals: 5,
                                  format: "numberShort",
                                })} ${
                                  HAUS_NETWORK_DATA[daoChain as ValidNetwork]
                                    ?.symbol
                                } for ${formatValueTo({
                                  value: fromWei(yeet.shares),
                                  decimals: 5,
                                  format: "numberShort",
                                })} ${yeeter.dao.shareTokenSymbol}`}
                              </DataLg>
                            </div>
                            <div className="message">
                              <ReactMarkdown className="projectDetails">
                                {yeet.message}
                              </ReactMarkdown>
                              <div className="date">
                                <DataXs>
                                  {formatShortDateTimeFromSeconds(
                                    yeet.createdAt
                                  )}
                                </DataXs>
                              </div>
                            </div>
                          </YeetListItem>
                        );
                      })}
                  </YeetListContainer>
                ),
              },
              {
                label: "EXITS",
                Component: () => (
                  <YeetListContainer>
                    {yeeter &&
                      ragequits &&
                      ragequits.length > 0 &&
                      ragequits.map((rq: RagequitItem) => {
                        return (
                          <YeetListItem key={rq.id}>
                            <div className="profile">
                              <ContributorProfile
                                address={rq.member.memberAddress}
                              />
                              <DataLg>
                                {`${formatValueTo({
                                  value: fromWei(rq.shares),
                                  decimals: 5,
                                  format: "numberShort",
                                })} ${yeeter.dao.shareTokenSymbol}`}
                              </DataLg>
                            </div>
                            <div className="date">
                              <DataXs>
                                {formatShortDateTimeFromSeconds(rq.createdAt)}
                              </DataXs>
                            </div>
                          </YeetListItem>
                        );
                      })}
                  </YeetListContainer>
                ),
              },
              {
                label: "COMMENTS",
                Component: () => (
                  <YeetComments
                    daoId={daoId}
                    daoChain={daoChain}
                    yeeterId={yeeterId}
                  />
                ),
              },
              {
                label: "CAMPAIGN DETAILS",
                Component: () => (
                  <ContractDetails
                    daoId={daoId}
                    daoChain={daoChain}
                    yeeterId={yeeterId}
                  />
                ),
              },
            ]}
          ></Tabs>
        </TitleContainer>
      </>
    </Container>
  );
};

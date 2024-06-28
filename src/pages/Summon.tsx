import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Link,
  ParLg,
  ParMd,
  ParSm,
  SingleColumnLayout,
  Spinner,
} from "@daohaus/ui";
import { set } from "date-fns";
import { ButtonRouterLink } from "../components/ButtonRouterLink";
import { truncateAddress } from "@daohaus/utils";
import { Link as RouterLink } from "react-router-dom";
import { ValidNetwork, generateExplorerLink } from "@daohaus/keychain-utils";
import { DEFAULT_CHAIN_ID } from "../utils/constants";

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.info.step12};
  padding: 1rem;
  &:hover {
    text-decoration: none;
  }
`;

const StyledExternalLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.info.step12};
  padding: 1rem;
  &:hover {
    text-decoration: none;
  }
`;

const ContractInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContractInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 1rem;
`;

const YeeterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ShamanItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Summon = () => {
  const navigate = useNavigate();
  const { chainId } = useDHConnect();
  const [txSuccess, setTxSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [pollSuccess, setPollSuccess] = useState(false);
  const [pollResult, setPollResult] = useState<null | any>(null);

  const handleModalChange = () => {
    setModalOpen(!modalOpen);
    if (pollSuccess && pollResult?.data?.dao?.name) {
      // console.log("navigating to details");
      const yeeter = pollResult?.data?.dao?.shamen.find(
        (shaman: any) => shaman.permissions === "2"
      );
      navigate(
        `/molochv3/${chainId}/${pollResult?.data?.dao?.id}/${yeeter.shamanAddress}`
      );
    } else {
      //  console.log("navigating to dashboard");
      navigate("/");
    }
  };

  return (
    <SingleColumnLayout>
      {!txSuccess && (
        <FormBuilder
          form={APP_FORM.SUMMON_MEME}
          customFields={AppFieldLookup}
          targetNetwork={DEFAULT_CHAIN_ID}
          submitButtonText="Summon Token"
          lifeCycleFns={{
            onPollSuccess: (result) => {
              console.log("poll success", result);
              setPollSuccess(true);
              setPollResult(result);
            },
            onTxSuccess: (result) => {
              setTxSuccess(true);
              setModalOpen(true);
            },
          }}
        />
      )}
      {txSuccess && (
        <Dialog open={modalOpen} onOpenChange={handleModalChange}>
          <DialogContent title="Summon Details">
            {!pollSuccess ? (
              <>
                <ParMd>
                  Your token has been summoned please wait for the indexers to
                  update{" "}
                </ParMd>
                <Spinner />
              </>
            ) : (
              <>
                <ParLg>It has been summoned!</ParLg>
                {pollResult?.data?.dao?.name ? (
                  <>
                    <ParMd>New Token: {pollResult?.data?.dao?.name} </ParMd>
                    {pollResult?.data?.dao?.shamen?.length ? (
                      <ContractInfoWrapper>
                        {pollResult?.data?.dao?.shamen.map(
                          (shaman: any, idx: number) => (
                            <ContractInfoItem key={idx}>
                              {shaman.permissions === "2" ? (
                                <YeeterItem>
                                  <ParLg>Token Presale</ParLg>
                                  <ParMd>
                                    Participate in raid here. Share this link to
                                    others interested{" "}
                                  </ParMd>
                                  <ParMd>
                                    {truncateAddress(shaman.shamanAddress)}
                                  </ParMd>
                                  <StyledRouterLink
                                    to={`/molochv3/${chainId}/${pollResult?.data?.dao?.id}/${shaman.shamanAddress}`}
                                  >
                                    <ParSm>Token Page</ParSm>
                                  </StyledRouterLink>
                                </YeeterItem>
                              ) : (
                                <ShamanItem>
                                  <ParLg>Market Maker </ParLg>
                                  <ParMd>
                                    THis contract extention creates the LP.
                                  </ParMd>
                                  <ParMd>
                                    {truncateAddress(shaman.shamanAddress)}
                                  </ParMd>
                                  <Link
                                    href={generateExplorerLink({
                                      chainId: chainId as ValidNetwork,
                                      address: shaman.shamanAddress,
                                    })}
                                    target="_blank"
                                  >
                                    <ParSm>View on Etherscan</ParSm>
                                  </Link>
                                </ShamanItem>
                              )}
                            </ContractInfoItem>
                          )
                        )}
                      </ContractInfoWrapper>
                    ) : (
                      <ParMd>No Shamens found</ParMd>
                    )}
                  </>
                ) : (
                  <ParMd>
                    Continue to the dashboard{" "}
                    <StyledRouterLink to="/">
                      <Button variant="solid">Dashboard</Button>
                    </StyledRouterLink>
                  </ParMd>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </SingleColumnLayout>
  );
};

export default Summon;

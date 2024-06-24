import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { useState } from "react";
import styled from "styled-components";
import { Button, Dialog, DialogContent, DialogTrigger, Link, ParLg, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { ADMIN_URL } from "../utils/constants";
import { set } from "date-fns";
import { truncateAddress } from "@daohaus/utils";
import { Link as RouterLink } from 'react-router-dom';


const StyledExternalLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.info.step12};
  padding: 1rem;
  &:hover {
    text-decoration: none;
  }
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.info.step12};
  padding: 1rem;
  &:hover {
    text-decoration: none;
  }
`;

const ContractInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const EscrowItem = styled.div`
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
      const yeeter = pollResult?.data?.dao?.shamen.find((shaman: any) => shaman.permissions === "2");
      navigate(`/molochv3/${chainId}/${pollResult?.data?.dao?.id}/${yeeter.shamanAddress}`);
      // navigate(ADMIN_URL);
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
          targetNetwork={chainId}
          submitButtonText="Summon NFT Escrow"
          lifeCycleFns={{
            onPollSuccess: (result) => {
              console.log("poll success", result);
              setPollSuccess(true);
              setPollResult(result);
            },
            onTxSuccess: (result) => {
              setTxSuccess(true);
              setModalOpen(true);
            }
          }}
        />
      )}
      {txSuccess && (
        <Dialog open={modalOpen} onOpenChange={handleModalChange} >

          <DialogContent title="Summon Details">
            {!pollSuccess ? (
              <>
                <ParMd>Your escrow has been summoned please wait for the indexors to update </ParMd>
                <Spinner />
              </>
            ) : (
              <>
                <ParLg>
                  It has been summoned!</ParLg>
                {pollResult?.data?.dao?.name ? (
                  <>
                    <ParMd>New Raid Name: {pollResult?.data?.dao?.name}{" "} </ParMd>
                    {pollResult?.data?.dao?.shamen?.length ? (

                      <ContractInfoWrapper>
                        {pollResult?.data?.dao?.shamen.map((shaman: any, idx: number) => (
                          <ContractInfoItem key={idx}>

                            {shaman.permissions === "2" ?
                              (<YeeterItem>
                                <ParLg>Yeeter </ParLg>
                                <ParMd>Participate in raid here. Share this link to others interested </ParMd>
                                <ParMd>{truncateAddress(shaman.shamanAddress)}</ParMd>
                                <StyledRouterLink to={`/molochv3/${chainId}/${pollResult?.data?.dao?.id}/${shaman.shamanAddress}`}>
                                  <Button variant="solid">Yeet</Button></StyledRouterLink>
                              </YeeterItem>)
                              : (<EscrowItem>
                                <ParLg>Escrow </ParLg>
                                <ParMd>Seller must approve this contract to transfer NFT.</ParMd>
                                <ParMd>{truncateAddress(shaman.shamanAddress)}</ParMd>
                                <StyledExternalLink href={`https://etherscan.io/address/${shaman.shamanAddress}`} target="_blank">
                                  <Button variant="solid">View on Etherscan</Button></StyledExternalLink>
                              </EscrowItem>)}


                          </ContractInfoItem>
                        ))}
                      </ContractInfoWrapper>

                    ) : (
                      <ParMd>No Shamens found</ParMd>
                    )}
                  </>
                ) : (
                  <ParMd>Continue to the dashboard <StyledRouterLink to="/"><Button variant="solid">Dashboard</Button></StyledRouterLink></ParMd>
                )}
              </>

            )
            }
          </DialogContent>
        </Dialog>

      )}
    </SingleColumnLayout>
  );
};

export default Summon;

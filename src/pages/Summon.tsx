import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContent, DialogTrigger, Link, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { ADMIN_URL } from "../utils/constants";
import { set } from "date-fns";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
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
                <ParMd>
                  It has been summoned! You can view it now here </ParMd>
                {pollResult?.data?.dao?.name ? (
                  <>
                    <ParMd>NAME: {pollResult?.data?.dao?.name}{" "} </ParMd>
                    {pollResult?.data?.dao?.shamen?.length ? (

                      <>
                        <ParMd>Shamen info:</ParMd>
                        {pollResult?.data?.dao?.shamen.map((shaman: any, idx: number) => (
                          <div key={idx}>
                          <ParMd >
                            {shaman.permissions === "2" ? (`Yeeter: ${shaman.shamanAddress} `) : `Escrow: ${shaman.shamanAddress}`}    
                          </ParMd>
                          {shaman.permissions === "2" && <ButtonRouterLink to={`/molochv3/${chainId}/${pollResult?.data?.dao?.id}/${shaman.shamanAddress}`}>Yeet</ButtonRouterLink>}
                          </div>
                        ))}
                      </>

                    ) : (
                      <ParMd>No Shamens found</ParMd>
                    )}
                  </>
                ) : (
                  <ParMd>Continue to the dashboard <ButtonRouterLink to="/">Dashboard</ButtonRouterLink></ParMd>
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

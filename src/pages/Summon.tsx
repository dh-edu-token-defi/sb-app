import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContent, DialogTrigger, Link, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { ADMIN_URL } from "../utils/constants";

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
  const [pollSuccess, setPollSuccess] = useState(false);
  const [pollResult, setPollResult] = useState<null | any>(null);


  // todo: check chainId here is a valid one and pass to formbuilder
  console.log("chainId", chainId);

  return (
    <SingleColumnLayout>
      {!txSuccess && (
        <FormBuilder
          form={APP_FORM.SUMMON_MEME}
          customFields={AppFieldLookup}
          targetNetwork={chainId}
          submitButtonText="Summon NFT Raid Token"
          lifeCycleFns={{
            onPollSuccess: (result) => {
              console.log("poll success", result);
              setPollSuccess(true);
              setPollResult(result);

            },
            onTxSuccess: (result) => {
              setTxSuccess(true);
            }
          }}
        />
      )}
      {txSuccess && (
        <Dialog open={true} >

          <DialogContent title="Summon Details">
            {!pollSuccess ? (
              <>
                <ParMd>Your Meme token has been summoned please wait for the indexors to update</ParMd>
                <Spinner />
              </>
            ) : (
              <>
                <ParMd>
                  It has been summoned! You can view it now here</ParMd>
                {pollResult?.data?.dao?.name ? (
                  <>
                    <ParMd>DAO NAME: {pollResult?.data?.dao?.name}{" "} </ParMd>
                    {pollResult?.data?.dao?.shamen?.length ? (

                      <>
                        <ParMd>Shamens:</ParMd>
                        {pollResult?.data?.dao?.shamen.map((shaman: any) => (
                          <ParMd>
                            {shaman.permissions === "2" ? `Yeeter: /${chainId}/${shaman.shamanAddress}` : `Market Maker: ${shaman.shamanAddress}`}
                          </ParMd>
                        ))}
                      </>

                    ) : (
                      <ParMd>No Shamens found</ParMd>
                    )}
                  </>
                ) : (
                  <ParMd>Continue to the dashboard</ParMd>
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

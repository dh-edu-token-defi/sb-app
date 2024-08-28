import { useDHConnect } from "@daohaus/connect";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { YeeterItem } from "../../utils/types";
import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../../legos/forms";
import { AppFieldLookup } from "../../legos/fieldConfig";
import { DEFAULT_CHAIN_ID } from "../../utils/constants";
import { Button, ParMd } from "@daohaus/ui";
import styled from "styled-components";
import { ButtonRouterLink } from "../ButtonRouterLink";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useCurrentYeeter } from "../../contexts/CurrentYeeterContext";

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const BackButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    `;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    `;

export const JoinForm = () => {
    const { daoChain, daoId } = useCurrentDao();
    const { shamanAddress } = useCurrentYeeter();
  
    if (!daoId || !daoChain || !shamanAddress) return null;

  
    const [txSuccess, setTxSuccess] = useState(false);
    const [pollSuccess, setPollSuccess] = useState<boolean>(false);
    const [pollResult, setPollResult] = useState<YeeterItem | null>(null);
  
    const onFormComplete = useCallback((result: any) => {
      console.log("result on success handle yeets", result);
      setPollSuccess(true);
      setPollResult(result);
    }, []);


    return (
        <FormWrapper>
                          <BackButtonWrapper>
                <ButtonRouterLink
                  to={`/molochv3/${daoChain}/${daoId}/${shamanAddress}`}
                >
                  <ParMd>Back To Dashboard</ParMd>
                </ButtonRouterLink>
                </BackButtonWrapper>
        {!pollSuccess && (
            <>
              <FormBuilder
                form={APP_FORM.YEET_FORM}
                customFields={AppFieldLookup}
                targetNetwork={DEFAULT_CHAIN_ID}
                submitButtonText="JOIN"
                lifeCycleFns={{
                  onPollSuccess: (result) => {
                    console.log("poll success", result);
                    onFormComplete(result);
                  },
                  onTxSuccess: (result) => {
                    setTxSuccess(true);
                  },
                }}
              />

            </>
          )}
          {pollSuccess && (
            <SuccessWrapper>
              <ParMd>{`YEETED! I'm doing my part!`}</ParMd>

                <ButtonRouterLink
                  to={`/molochv3/${daoChain}/${daoId}/${shamanAddress}`}
                >
                  <ParMd>See your YEET and others here</ParMd>
                </ButtonRouterLink>
            
            </SuccessWrapper>
          )}
          </FormWrapper>
    )
}
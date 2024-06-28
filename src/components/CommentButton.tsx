import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";

import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  FormLayout,
  ParMd,
} from "@daohaus/ui";
import { useState } from "react";
import { AppFieldLookup } from "../legos/fieldConfig";

import { ModalContainer } from "./ModalContainer";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { MdAddComment } from "react-icons/md";

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const StyledFormLayout = styled(FormLayout)`
  margin-top: unset;
`;

const ButtonTextIcon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const CommentButton = ({
  daoChain,
  daoId,
  yeeterId,
  icon,
}: {
  daoChain: ValidNetwork;
  daoId: string;
  yeeterId: string;
  icon?: boolean;
}) => {
  const [txSuccess, setTxSuccess] = useState(false);
  const [pollSuccess, setPollSuccess] = useState<boolean>(false);

  const onFormComplete = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any
  ) => {
    console.log("result on success handle yeets", result);
    setPollSuccess(true);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {icon ? (
            <Button size="sm" style={{ marginTop: "2rem" }} variant="ghost">
              <ButtonTextIcon>
                <MdAddComment /> COMMENT
              </ButtonTextIcon>
            </Button>
          ) : (
            <Button size="sm" style={{ marginTop: "2rem" }} variant="outline">
              COMMENT
            </Button>
          )}
        </DialogTrigger>
        <DialogContent title={``}>
          <StyledFormLayout>
            <ModalContainer
              daoChain={daoChain}
              daoId={daoId}
              yeeterId={yeeterId}
            >
              {!pollSuccess && (
                <>
                  <FormBuilder
                    form={APP_FORM.YEET_COMMENT}
                    customFields={AppFieldLookup}
                    lifeCycleFns={{
                      onPollSuccess: (result) => {
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
                  <ParMd>Comment Submitted!</ParMd>
                </SuccessWrapper>
              )}
            </ModalContainer>
          </StyledFormLayout>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentButton;

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
    Link,
    ParMd,
    ParSm,
    SingleColumnLayout,
} from "@daohaus/ui";
import { useState } from "react";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { YeeterItem } from "../utils/types";
import { ModalContainer } from "./ModalContainer";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { DaoProfileYeeter } from "../hooks/useYeeter";

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

const CommentButton = ({
    daoChain,
    daoId,
    yeeterId,
    refetch
}: {
    daoChain: ValidNetwork;
    daoId: string;
    yeeterId: string;
    refetch?: () => void;
}) => {
    const navigate = useNavigate();
    const { chainId } = useDHConnect();

    const [txSuccess, setTxSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [pollSuccess, setPollSuccess] = useState<boolean>(false);
    const [pollResult, setPollResult] = useState<YeeterItem | null>(null);

    const onFormComplete = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result: any
    ) => {
        console.log("result on success handle yeets", result);
        setPollSuccess(true);
        setPollResult(result);
        refetch && refetch();
    };


    return (
        <>
            <Dialog >
                <DialogTrigger asChild>
                    <Button size="lg" style={{ marginTop: "2rem" }} variant="outline">
                        COMMENT
                    </Button>
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

                        </ModalContainer>
                    </StyledFormLayout>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CommentButton;

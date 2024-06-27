import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";

import styled from "styled-components";
import { Button, Dialog, DialogContent, DialogTrigger, Link, ParMd, ParSm, SingleColumnLayout, } from "@daohaus/ui";
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

const IntroText = styled(ParMd)`
    margin-top: -5rem;


`;



const BuyButton = ({
    daoChain,
    daoId,
    yeeterId,
    metadata,
    context
}: {
    daoChain: ValidNetwork;
    daoId: string;
    yeeterId: string;
    metadata?: DaoProfileYeeter;
    context?: "details" | "dashboard";
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
    };

    const handleOpen = () => {
        setPollSuccess(false);
        setPollResult(null);
        setOpen(true);
    };

    const handleClose = () => {
        setPollSuccess(false);
        setPollResult(null);
        setOpen(false);
    }

    const yeetAgain = () => {
        setPollSuccess(false);
        setPollResult(null);
    }


    return (
        <>
        <style>
            {`
                [class^="Dialogstyles__CloseIcon-"] {
                    display: none;
                }
            `}
        </style>
        <Dialog onOpenChange={handleOpen} open={open}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    style={{ marginTop: "2rem" }}
                    variant="outline"
                >
                    BUY
                </Button>
            </DialogTrigger>
            <DialogContent title="YEET">
                <SingleColumnLayout>

                    <IntroText>
                        {`${metadata?.name ? `This is a presale for ${metadata?.name}.` : ''} If the threshold is met the meme will be minted, the presale will close and a Uniswap v3 LP is started. The meme will be available for purchase on the marketplace.`}
                    </IntroText>
                    <ModalContainer
                        daoChain={daoChain}
                        daoId={daoId}
                        yeeterId={yeeterId}
                    >
                        {!pollSuccess && (
                            <>
                                <FormBuilder
                                    form={APP_FORM.YEET_FORM}
                                    customFields={AppFieldLookup}
                                    targetNetwork={chainId}
                                    submitButtonText="YEET"
                                    lifeCycleFns={{
                                        onPollSuccess: (result) => {
                                            console.log("poll success", result);
                                            onFormComplete(result);
                                        },
                                        onTxSuccess: (result) => {
                                            setTxSuccess(true);
                                        }
                                    }}
                                />
                                {/* width 100% */}
                                <Button
                                    onClick={handleClose}
                                    style={{ marginTop: "2rem", width: "93%" }}
                                    variant="outline"
                                >
                                    <ParMd>
                                        Cancel
                                    </ParMd>
                                </Button>
                            </>
                        )}
                        {pollSuccess && (
                            <SuccessWrapper>
                                <ParMd>
                                    {`YEETED! I'm doing my part!`}
                                </ParMd>
                                {context == "dashboard" && (
                                    <ButtonRouterLink to={`/molochv3/${chainId}/${daoId}/${yeeterId}`}>
                                        <ParMd>
                                            See your YEET and others here
                                        </ParMd>
                                    </ButtonRouterLink>
                                )}
                                {context == "details" && (
                                    <Button
                                        onClick={() => setOpen(false)}>
                                        <ParMd>
                                            See your YEET and others here
                                        </ParMd>
                                    </Button>
                                )}
                                <Button
                                    onClick={yeetAgain}>
                                    <ParMd>
                                        Yeet Again
                                    </ParMd>
                                </Button>

                            </SuccessWrapper>
                        )}
                    </ModalContainer>
                </SingleColumnLayout>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default BuyButton;

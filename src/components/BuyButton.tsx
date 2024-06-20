import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";

import styled from "styled-components";
import { Button, Dialog, DialogContent, DialogTrigger, Link, ParMd, SingleColumnLayout, } from "@daohaus/ui";
import { useState } from "react";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { YeeterItem } from "../utils/types";
import { ModalContainer } from "./ModalContainer";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { DaoProfileYeeter } from "../hooks/useYeeter";


const BuyButton = ({
    daoChain,
    daoId,
    yeeterId,
    metadata
}: {
    daoChain: ValidNetwork;
    daoId: string;
    yeeterId: string;
    metadata?: DaoProfileYeeter;
}) => {

    const navigate = useNavigate();
    const { chainId } = useDHConnect();

    const [txSuccess, setTxSuccess] = useState(false);
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

    const handleClose = () => {
        setPollSuccess(false);
        setPollResult(null);
    };


    return (
        <Dialog onOpenChange={handleClose}>
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
                    <ParMd>
                        {`${metadata?.name ? `This is a presale for ${metadata?.name}` : '' } If the threshold is met the meme will be minted, the presale will close and a Uniswap v3 LP is started. The meme will be available for purchase on the marketplace.`}
                    </ParMd>
                    <ModalContainer
                        daoChain={daoChain}
                        daoId={daoId}
                        yeeterId={yeeterId}
                    >
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
                        {pollSuccess && (
                            <>
                                <ParMd>
                                    {`YEETED! I'm doing my part!`}
                                </ParMd>
                                <ButtonRouterLink to={`/molochv3/${chainId}/${daoId}/${yeeterId}`}>
                                    <ParMd>
                                        See your YEET and others here
                                    </ParMd>
                                </ButtonRouterLink>
                            </>
                        )}
                    </ModalContainer>
                </SingleColumnLayout>
            </DialogContent>
        </Dialog>
    );
};

export default BuyButton;

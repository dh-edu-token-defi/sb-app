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
import { useEscrow } from "../hooks/useEscrow";
import { useDaoData } from "@daohaus/moloch-v3-hooks";


const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const ExecuteEscrowButton = ({
    daoChain,
    yeeterId,
    daoId,
}: {
    daoChain: ValidNetwork;
    yeeterId: string;
    daoId: string;
}) => {

    const navigate = useNavigate();
    const { chainId } = useDHConnect();

    const [txSuccess, setTxSuccess] = useState(false);
    const [pollSuccess, setPollSuccess] = useState<boolean>(false);
    const [pollResult, setPollResult] = useState<YeeterItem | null>(null);

    const { dao } = useDaoData({ daoId, daoChain });

    const { nftEscrowShaman, canExecute} = useEscrow({
        daoId,
        yeeterShamanAddress: yeeterId,
        chainId: daoChain,
        daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
      });

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
                    EXECUTE ESCROW
                </Button>
            </DialogTrigger>
            <DialogContent title="EXECUTE">
                <SingleColumnLayout>
                    <ModalContainer
                        daoChain={daoChain}
                        daoId={daoId}
                        yeeterId={yeeterId}
                    >
                        {canExecute ? (<FormBuilder
                            form={APP_FORM.EXECUTE_ESCROW_FORM}
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
                        />) : (
                            <ParMd>
                                {``}
                            </ParMd>
                        )}
                        {pollSuccess && (
                            <>
                                <ParMd>
                                    {`YEETED! I'm doing my part!`}
                                </ParMd>
                                <LinkButton href={''}>
                                    <ParMd>
                                        See the market
                                    </ParMd>
                                </LinkButton>
                            </>
                        )}
                    </ModalContainer>
                </SingleColumnLayout>
            </DialogContent>
        </Dialog>
    );
};

export default ExecuteEscrowButton;

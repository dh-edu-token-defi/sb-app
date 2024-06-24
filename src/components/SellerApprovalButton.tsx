import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";

import styled from "styled-components";
import { Button, DataIndicator, Dialog, DialogContent, DialogTrigger, Link, ParLg, ParMd, SingleColumnLayout, } from "@daohaus/ui";
import { useMemo, useState } from "react";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { YeeterItem } from "../utils/types";
import { ModalContainer } from "./ModalContainer";
import { ValidNetwork } from "@daohaus/keychain-utils";

import { useDaoData, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from "@daohaus/utils";
import { formatMemberBalance } from "../utils/yeetDataHelpers";
import { useEscrow } from "../hooks/useEscrow";


const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const SellerApprovalButton = ({
    daoChain,
    yeeterId,
    daoId,
}: {
    daoChain: ValidNetwork;
    yeeterId: string;
    daoId: string;
}) => {

    const { chainId, address } = useDHConnect();

    const [txSuccess, setTxSuccess] = useState(false);
    const [pollSuccess, setPollSuccess] = useState<boolean>(false);
    const [pollResult, setPollResult] = useState<YeeterItem | null>(null);

    const { dao } = useDaoData({ daoId, daoChain });
    const { nftEscrowShaman, nftAddress, tokenId, seller } = useEscrow({
        daoId,
        yeeterShamanAddress: yeeterId,
        chainId: daoChain,
        daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
    });

    const defaultFields = useMemo(() => {
        if (nftEscrowShaman && tokenId && nftAddress) {
            return {
                escrow: nftEscrowShaman,
                tokenId: tokenId?.toString(),
                nftAddress: nftAddress,

            };
        }
    }, [nftEscrowShaman, tokenId, nftAddress]);

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
                    Approve Escrow
                </Button>
            </DialogTrigger>
            <DialogContent title="JEET">
                <SingleColumnLayout>
                    {address == seller ? (<ModalContainer
                        daoChain={daoChain}
                        daoId={daoId}
                        yeeterId={yeeterId}
                    >
                        <DataIndicator
                            label="Seller"
                            data={`${seller}`}
                        />
                        <DataIndicator
                            label="NFT Address"
                            data={`${nftAddress}`}
                        />
                        <DataIndicator
                            label="TokenId"
                            data={`${tokenId}`}
                        />

                        <FormBuilder
                            defaultValues={defaultFields}
                            form={APP_FORM.SELLER_APPROVAL_FORM}
                            customFields={AppFieldLookup}
                            targetNetwork={chainId}
                            submitButtonText="APPROVE"
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
                                    {`JEETED! I'm out!`}
                                </ParMd>
                                <ParMd>
                                    {`JEETED! I'm out!`}
                                </ParMd>
                            </>
                        )}
                    </ModalContainer>) : (
                        <ParLg>
                            {`Only the current owner can do this to approve the escrow to execute the swap once the necessary conditions are met.`}
                        </ParLg>
                    )}
                </SingleColumnLayout>
            </DialogContent>
        </Dialog>
    );
};

export default SellerApprovalButton;

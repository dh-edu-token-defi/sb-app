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
import { SimpleRow } from "../Layout/Layout";
import { CopyToClipboardButton } from "../CopyToClipboardButton";

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

export const ShareForm = () => {
    const { daoChain, daoId } = useCurrentDao();
    const { shamanAddress } = useCurrentYeeter();

    if (!daoId || !daoChain || !shamanAddress) return null;

    const { dao } = useDaoData({ daoId, daoChain });

    if (!dao) return null;

    return (
        <FormWrapper>
            <BackButtonWrapper>
                <ButtonRouterLink
                    to={`/molochv3/${daoChain}/${daoId}/${shamanAddress}`}
                >
                    <ParMd>Back To Dashboard</ParMd>
                </ButtonRouterLink>
            </BackButtonWrapper>
            <SimpleRow>
                <Button size="md" variant="ghost">
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `Check out the ${dao.name} / ${dao.shareTokenSymbol} token here: ${window.location.href}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        𝕏
                    </a>
                </Button>
                <Button size="md" variant="outline" disabled={true}>
                    Warpcast Frame (Coming Soon)
                </Button>
                <CopyToClipboardButton
                    textToCopy={`Check out the ${dao.name} / ${dao.shareTokenSymbol} token here: ${window.location.href}`}
                />
            </SimpleRow>
        </FormWrapper>
    )
}



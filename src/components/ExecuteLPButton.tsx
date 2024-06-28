import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";

import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Link,
  ParMd,
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
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useDaoData } from "../hooks/useDaoData";
import { DEFAULT_CHAIN_ID } from "../utils/constants";
import { useQueryClient } from "react-query";

const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const ExecuteLPButton = ({
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

  const queryClient = useQueryClient();

  const { marketMakerShaman, canExecute, uniswapUrl } = useMarketMaker({
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
    queryClient.invalidateQueries({
      queryKey: ["market-maker"],
    });
  };

  const handleClose = () => {
    setPollSuccess(false);
    setPollResult(null);
  };

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button size="lg" style={{ marginTop: "2rem" }} variant="outline">
          EXECUTE LP
        </Button>
      </DialogTrigger>
      <DialogContent title="EXECUTE">
        <SingleColumnLayout>
          <ModalContainer daoChain={daoChain} daoId={daoId} yeeterId={yeeterId}>
            {canExecute ? (
              <FormBuilder
                form={APP_FORM.EXECUTE_LP_FORM}
                customFields={AppFieldLookup}
                targetNetwork={DEFAULT_CHAIN_ID}
                submitButtonText="EXECUTE"
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
            ) : (
              <ParMd>{``}</ParMd>
            )}
            {pollSuccess && (
              <>
                <ParMd>{`YEETED! I'm doing my part!`}</ParMd>
                <LinkButton href={uniswapUrl}>
                  <ParMd>See the market on univ3</ParMd>
                </LinkButton>
              </>
            )}
          </ModalContainer>
        </SingleColumnLayout>
      </DialogContent>
    </Dialog>
  );
};

export default ExecuteLPButton;

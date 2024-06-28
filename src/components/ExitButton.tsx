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
  ParLg,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import { useMemo, useState } from "react";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { YeeterItem } from "../utils/types";
import { ModalContainer } from "./ModalContainer";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { DaoProfileYeeter } from "../hooks/useYeeter";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useDaoMember } from "@daohaus/moloch-v3-hooks";
import { sortTokensForRageQuit } from "@daohaus/moloch-v3-fields";
import { NETWORK_TOKEN_ETH_ADDRESS, TokenBalance } from "@daohaus/utils";
import { formatMemberBalance } from "../utils/yeetDataHelpers";
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

const ExitButton = ({
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
  const { member } = useDaoMember({ daoId, daoChain, memberAddress: address });

  const queryClient = useQueryClient();

  const defaultFields = useMemo(() => {
    if (address && dao) {
      const treasury = dao.vaults.find(
        (v) => dao.safeAddress === v.safeAddress
      );

      return {
        to: address,
        tokens: [NETWORK_TOKEN_ETH_ADDRESS],
        sharesToBurn: member?.shares || "0",
        lootToBurn: member?.loot || "0",
      };
    }
  }, [address, dao]);

  const onFormComplete = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any
  ) => {
    console.log("result on success handle yeets", result);
    setPollSuccess(true);
    setPollResult(result);

    queryClient.invalidateQueries({
      queryKey: ["get-yeeter"],
    });

    queryClient.invalidateQueries({
      queryKey: ["list-ragequits"],
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
          EXIT
        </Button>
      </DialogTrigger>
      <DialogContent title="JEET">
        <SingleColumnLayout>
          <ModalContainer daoChain={daoChain} daoId={daoId} yeeterId={yeeterId}>
            <ParLg>
              {`Burn your balance: ${formatMemberBalance(
                member?.shares || "0"
              )}`}
            </ParLg>
            <FormBuilder
              defaultValues={defaultFields}
              form={APP_FORM.EXIT_PRESALE_FORM}
              customFields={AppFieldLookup}
              targetNetwork={DEFAULT_CHAIN_ID}
              submitButtonText="JEET"
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
            {pollSuccess && (
              <>
                <ParMd>{`JEETED! I'm out!`}</ParMd>
                <ParMd>{`JEETED! I'm out!`}</ParMd>
              </>
            )}
          </ModalContainer>
        </SingleColumnLayout>
      </DialogContent>
    </Dialog>
  );
};

export default ExitButton;

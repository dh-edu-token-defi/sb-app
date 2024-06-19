import { useNavigate, useParams } from "react-router-dom";

import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/fieldConfig";
import { useDHConnect } from "@daohaus/connect";
import { useState } from "react";
import styled from "styled-components";
import { Link, SingleColumnLayout } from "@daohaus/ui";
import { ADMIN_URL } from "../utils/constants";

const LinkButton = styled(Link)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

const Summon = () => {
  const navigate = useNavigate();
  const { chainId } = useDHConnect();
  const [txSuccess, setTxSuccess] = useState(false);


  const onFormComplete = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any
  ) => {
    console.log("result on success handle", result);
    const daoAddress = result?.items[0]?.id;
    navigate(`/success/${daoAddress}`);
  };

  // todo: check chainId here is a valid one and pass to formbuilder
  console.log("chainId", chainId);

  return (
    <SingleColumnLayout>
      <FormBuilder
        form={APP_FORM.SUMMON_MEME}
        customFields={AppFieldLookup}
        targetNetwork={chainId}
        submitButtonText="Summon NFT Raid Token"
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
    </SingleColumnLayout>
  );
};

export default Summon;

import { useParams } from "react-router-dom";


import { ValidNetwork } from "@daohaus/keychain-utils";

import Dao from "./Dao";

export const DaoContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId, yeeterId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
    yeeterId: string;
  }>();

  if (!daoId || !daoChain || !yeeterId) return null;
  console.log("render dao container", daoId);

  return (
    <Dao
      daoId={daoId}
      daoChain={daoChain}
      proposalId={proposalId}
      memberAddress={memberAddress}
      yeeterId={yeeterId}
    />
  );
};

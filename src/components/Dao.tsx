import { Outlet } from "react-router-dom";
import { useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { memo, useMemo } from "react";
import { CurrentYeeterProvider } from "../contexts/CurrentYeeterContext";
import { Brand } from "./Brand";
import { DHLayout2 } from "./Layout/DhLayout";
import { useAuctionHaus } from "../hooks/useAuctionHaus";

const Dao = ({
  daoId,
  daoChain,
  proposalId,
  memberAddress,
  yeeterId,
}: {
  daoId: string;
  daoChain: ValidNetwork;
  proposalId?: string;
  memberAddress?: string;
  yeeterId: string;
}) => {
  const { publicClient, address } = useDHConnect();

  const daoData = useMemo(() => ({
    daoId: daoId as string,
    daoChain: daoChain as string,
  }), [daoId, daoChain]);

  const { dao } = useDaoData(daoData);

  const auctionHausData = useMemo(() => ({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  }), [daoId, yeeterId, daoChain, dao?.shamen]);

  const { auctionHausShaman } = useAuctionHaus(auctionHausData);

  console.log("dao render", { daoId, daoChain, proposalId, memberAddress, yeeterId });

  return (
    <DHLayout2 leftNav={<Brand />}>
      <CurrentDaoProvider
        userAddress={address}
        targetDao={{
          daoChain: daoChain,
          daoId: daoId,
          proposalId,
          memberAddress,
        }}
      >
        <TXBuilder
          publicClient={publicClient}
          chainId={daoChain}
          daoId={daoId}
          safeId={dao?.safeAddress}
          appState={{
            dao,
            memberAddress: address,
            shamanAddress: yeeterId,
            auctionHausShaman,
          }}
        >
          <CurrentYeeterProvider shamanAddress={yeeterId}>
            <Outlet />
          </CurrentYeeterProvider>
        </TXBuilder>
      </CurrentDaoProvider>
    </DHLayout2>
  );
};

export default memo(Dao, (prevProps, nextProps) => {
  return (
    prevProps.daoId === nextProps.daoId &&
    prevProps.daoChain === nextProps.daoChain &&
    prevProps.proposalId === nextProps.proposalId &&
    prevProps.memberAddress === nextProps.memberAddress &&
    prevProps.yeeterId === nextProps.yeeterId
  );
});
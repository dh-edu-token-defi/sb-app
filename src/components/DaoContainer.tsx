import { Outlet, useLocation, useParams } from "react-router-dom";

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider } from "@daohaus/moloch-v3-hooks";
import { useYeeter } from "../hooks/useYeeter";
import { useEffect } from "react";
import { CurrentYeeterProvider } from "../contexts/CurrentYeeterContext";
import { useDaoData } from "../hooks/useDaoData";
import { Brand } from "./Brand";

export const DaoContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId, yeeterId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
    yeeterId: string;
  }>();

  if (!daoId || !daoChain || !yeeterId) return null;

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
  const location = useLocation();
  const { publicClient, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });

  useEffect(() => {
    if (location.pathname.match(/success/g)) {
      document.body.classList.add("explosion");
    } else {
      document.body.classList.remove("explosion");
    }
  }, [location]);

  const routePath = `molochv3/${daoChain}/${daoId}`;

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[{ label: "← ALL TOKENS", href: `/` }]}
      leftNav={<Brand />}
    >
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
          }}
        >
          <CurrentYeeterProvider shamanAddress={yeeterId}>
            <Outlet />
          </CurrentYeeterProvider>
        </TXBuilder>
      </CurrentDaoProvider>
    </DHLayout>
  );
};

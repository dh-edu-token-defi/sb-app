import { Outlet, useLocation, useParams } from "react-router-dom";

import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider } from "@daohaus/moloch-v3-hooks";
import { useYeeter } from "../hooks/useYeeter";
import { Children, ReactNode, useEffect } from "react";
import {
  CurrentYeeterProvider,
  useCurrentYeeter,
} from "../contexts/CurrentYeeterContext";
import { useMarketMaker } from "../hooks/useMarketMaker";
import { useDaoData } from "../hooks/useDaoData";

export const ModalContainer = ({
  children,
  daoChain,
  daoId,
  yeeterId,
}: {
  children: ReactNode;
  daoChain: ValidNetwork;
  daoId: string;
  yeeterId: string;
}) => {
  if (!daoId || !daoChain || !yeeterId) return null;

  return (
    <Yeetz daoId={daoId} daoChain={daoChain} yeeterId={yeeterId}>
      {children}
    </Yeetz>
  );
};

const Yeetz = ({
  daoId,
  daoChain,
  yeeterId,
  children,
}: {
  daoId: string;
  daoChain: ValidNetwork;
  yeeterId: string;
  children: ReactNode;
}) => {
  const { publicClient, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });
  const { marketMakerShaman } = useMarketMaker({
    daoId,
    yeeterShamanAddress: yeeterId,
    chainId: daoChain,
    daoShamans: dao?.shamen?.map((s) => s.shamanAddress),
  });

  return (
    <CurrentDaoProvider
      userAddress={address}
      targetDao={{
        daoChain: daoChain,
        daoId: daoId,
      }}
    >
      <TXBuilder
        publicClient={publicClient}
        chainId={daoChain}
        daoId={daoId}
        safeId={dao?.safeAddress}
        appState={{
          dao,
          daoId: daoId,
          memberAddress: address,
          shamanAddress: yeeterId,
          marketMakerShaman,
        }}
      >
        <CurrentYeeterProvider shamanAddress={yeeterId}>
          {children}
        </CurrentYeeterProvider>
      </TXBuilder>
    </CurrentDaoProvider>
  );
};

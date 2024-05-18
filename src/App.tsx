import { DHConnectProvider } from "@daohaus/connect";
import { useState } from "react";
import { Routes } from "./Routes";
import { targetNetworks } from "./utils/constants";

export const App = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();

  return (
    <DHConnectProvider daoChainId={daoChainId} networks={targetNetworks}>
      <Routes setDaoChainId={setDaoChainId} />
    </DHConnectProvider>
  );
};

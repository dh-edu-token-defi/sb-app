import { DHConnectProvider } from "@daohaus/connect";
import { useState } from "react";
import { Routes } from "./Routes";
import { supportedNetworks } from "./utils/constants";

export const App = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();

  return (
    <DHConnectProvider daoChainId={daoChainId} networks={supportedNetworks}>
      <Routes setDaoChainId={setDaoChainId} />
    </DHConnectProvider>
  );
};

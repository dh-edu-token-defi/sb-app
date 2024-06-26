import { MolochV3Dao, findDao } from "@daohaus/moloch-v3-data";
import {
  GRAPH_API_KEYS,
  Keychain,
  ValidNetwork,
} from "@daohaus/keychain-utils";
import { useQuery } from "react-query";
import { handleErrorMessage } from "@daohaus/utils";
import { daoScopedQueryId, useCurrentDao } from "@daohaus/moloch-v3-hooks";
// import { useCurrentDao } from '../contexts/CurrentDaoContext';
// import { DaoQueryKeys, daoScopedQueryId } from '../utils';

export const fetchDao = async ({
  daoId,
  daoChain,
  graphApiKeys,
}: {
  daoId?: string;
  daoChain?: ValidNetwork;
  graphApiKeys: Keychain;
}) => {
  if (!daoId || !daoChain) return;
  try {
    const daoRes = await findDao({
      networkId: daoChain,
      dao: daoId,
      includeTokens: false,
      graphApiKeys,
    });

    return daoRes?.data?.dao as MolochV3Dao;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching DAO" })
    );
  }
};

type DaoDataProps = {
  daoId: string;
  daoChain: string;
  graphApiKeys?: Keychain;
};

export const useDaoData = (props?: DaoDataProps | undefined) => {
  const { daoId, daoChain } = props || {};

  const { data, error, ...rest } = useQuery(
    ["dao-data", { daoId, daoChain }],
    () =>
      fetchDao({
        daoId,
        daoChain: daoChain as ValidNetwork,
        graphApiKeys: GRAPH_API_KEYS,
      }),
    {
      enabled: !!daoId && !!daoChain,
    }
  );

  return { dao: data, error: error as Error, ...rest };
};

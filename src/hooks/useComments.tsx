import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { listRecords } from "@daohaus/moloch-v3-data";
import { handleErrorMessage } from "@daohaus/utils";


const defaultGraphApiKeys = {
  "0x1": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x64": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xaa36a7": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0xa": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  "0x2105": import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
};

export type Comment = {
    daoId: string;
    title: string;
    content: string;
    contentURI: string;
    imageURI: string;
    authorAddress: string;
    author: string; // remove
    contentHash: string;
    parentId: string;
    id: string;
    recordId: string;
    createdAt: string;
    daoChain?: string;
    tag?: string;
    tags?: string[];
    relatedRecordId?: string;
  };



const fetchRecords = async ({
  daoId,
  chainId,
  pageSize,
  offset,
  graphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
}) => {
  try {
    let data;
    // get all comments if daoid is null

      data = await listRecords({
        networkId: chainId,
        graphApiKeys: graphApiKeys,
        filter: { dao: daoId, table: "COMMENT" },
        paging: { pageSize, offset },
      });

    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: "Error fetching records" })
    );
  }
};

export const useRecords = ({
  daoId,
  chainId,
  pageSize = 100,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
}: {
  daoId?: string;
  chainId: ValidNetwork;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`${daoId}-comments`, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        pageSize,
        offset,
        graphApiKeys,
      }),
    { enabled: !!chainId }
  );

  return { records: data, error: error as Error | null, ...rest };
};
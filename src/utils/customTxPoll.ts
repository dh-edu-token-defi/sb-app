import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import {

  findTransaction,
  findDao
} from "@daohaus/moloch-v3-data";

import { IListQueryResults } from "@daohaus/data-fetch-utils";
import { YEETER_GRAPH_URL, getValidChainId } from "./constants";
import { GraphQLClient } from "graphql-request";
import { GET_YEETS_BY_TX } from "./graphQueries";
import { IFindQueryResult } from "@daohaus/data-fetch-utils";


type PollFetch = (...args: any) => Promise<any>;

export const pollLastTX: PollFetch = async ({
  chainId,
  txHash,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  txHash: string;
  graphApiKeys: Keychain;
}) => {
  
  try {
    const result = await findTransaction({
      networkId: chainId,
      txHash,
      graphApiKeys,
    });

    if (result?.data?.transaction?.daoAddress) {
      const daoRes = await findDao(
        {
          networkId: chainId,
          dao: result.data.transaction.daoAddress,
          includeTokens: true,
          graphApiKeys,
        }
      );

      if (daoRes.data?.dao?.id) {
        console.log("daoRes", daoRes);
        return daoRes;
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export const testLastTX = (
  daoRes: IFindQueryResult<any> | undefined
) => {
  if (daoRes) {
    return true;
  }
  return false;
};

export const testYeet = (result: any | undefined) => {
  if (result?.yeets[0]) {
    console.log("yeet found", result.yeets[0]);
    return true;
  }
  return false;
};

export const pollYeet = async ({
  chainId,
  txHash,
}: {
  chainId: ValidNetwork;
  txHash: string;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);
  const res = await graphQLClient.request(GET_YEETS_BY_TX, {
    txHash: txHash?.toLowerCase(),
  });
  console.log("pollYeet res", res);

  return res;
};

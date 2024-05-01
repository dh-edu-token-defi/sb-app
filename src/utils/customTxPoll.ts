import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import {
  ListTxsQueryVariables,
  findDao,
  findTransaction,
  listDaos,
} from "@daohaus/moloch-v3-data";
import { IListQueryResults } from "@daohaus/data-fetch-utils";

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
  
  console.log("polling txHash", txHash, chainId);
  
  try {
    const result = await findTransaction({
      networkId: chainId,
      txHash,
      graphApiKeys,
    });

    console.log("poll result", result);
    if (result?.data?.transaction) {
      const daoRes = await listDaos({
        networkId: chainId,
        filter: {
          sharesAddress: result.data.transaction.daoAddress,
        },
      });

      if (daoRes?.items[0]) {
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
  daoRes: IListQueryResults<any, ListTxsQueryVariables> | undefined
) => {
  if (daoRes?.items[0]) {
    return true;
  }
  return false;
};

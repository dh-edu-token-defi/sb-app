import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import {

  findTransaction,
  findDao
} from "@daohaus/moloch-v3-data";
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

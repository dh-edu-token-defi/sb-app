import { getAddress } from 'viem';
import {
  formatFetchError,
  IFindQueryResult,
  fetch,
} from '@daohaus/data-fetch-utils';
import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';

export type SafeInfo = {
  address: string;
  nonce: number;
  threshold: number;
  owners: string[];
  masterCopy: string;
  modules: string[];
  fallbackHandler: string;
  guard: string;
  version: string;
};

export const fetchSafe = async ({
  networkId,
  safeAddress,
}: {
  networkId: ValidNetwork;
  safeAddress: string;
}): Promise<IFindQueryResult<SafeInfo>> => {
  const url = ENDPOINTS['GNOSIS_API'][networkId];
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const res = await fetch.get<SafeInfo>(
      `${url}/safes/${getAddress(safeAddress)}/`
    );

    return { data: res };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'GNOSIS_ERROR', errorObject: err }),
    };
  }
};
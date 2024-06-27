import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_YEETER } from "../utils/graphQueries";
import {
  CHAIN_OBJ,
  RPC_URLS,
  YEETER_GRAPH_URL,
  getValidChainId,
} from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfile, listRecords } from "@daohaus/moloch-v3-data";
import {
  calcYeetIsActive,
  calcYeetIsComing,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsEndingSoon,
  calcYeetIsNew,
  calcYeetReachedGoal,
  formatTimeRemaining,
} from "../utils/yeetDataHelpers";
import { YeeterItem } from "../utils/types";
import { createPublicClient, http } from "viem";

//todo change this wehn we get token name
export type DaoProfileYeeter = DaoProfile & {
  name: string;
};

export const useYeeter = ({
  chainId,
  daoId,
  shamanAddress,
  yeeterData,
}: {
  chainId?: ValidNetwork;
  daoId?: string;
  shamanAddress?: string;
  yeeterData?: YeeterItem;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    ["get-yeeter", { shamanAddress }],
    async () => {
      const res = yeeterData
        ? { yeeter: yeeterData }
        : ((await graphQLClient.request(GET_YEETER, {
            shamanAddress: shamanAddress?.toLowerCase(),
          })) as { yeeter: YeeterItem });
      let record;
      let safeBalance = "0";
      if (chainId) {
        record = await listRecords({
          networkId: chainId,
          filter: { dao: daoId, table: "daoProfile" },
        });

        const publicClient = createPublicClient({
          chain: CHAIN_OBJ[chain],
          transport: http(RPC_URLS[chain]),
        });

        const bal = await publicClient.getBalance({
          address: res.yeeter.vault as `0x${string}`,
        });

        safeBalance = bal.toString();
      }

      const isComing = res.yeeter && calcYeetIsComing(res.yeeter);
      const isComingSoon = res.yeeter && calcYeetIsComingSoon(res.yeeter);
      const isEndingSoon = res.yeeter && calcYeetIsEndingSoon(res.yeeter);
      const isNew = res.yeeter && calcYeetIsNew(res.yeeter);
      const yeeter = {
        ...res.yeeter,
        safeBalance,
        isActive: res.yeeter && calcYeetIsActive(res.yeeter),
        isEnded: res.yeeter && calcYeetIsEnded(res.yeeter),
        isComing,
        isComingSoon: isComingSoon,
        isEndingSoon: isEndingSoon,
        isNew: isNew,
        reachedGoal: res.yeeter && calcYeetReachedGoal(safeBalance, res.yeeter),
        timeRemaining:
          res.yeeter && isComingSoon
            ? formatTimeRemaining(res.yeeter)
            : "Finished",
      } as YeeterItem;

      return {
        yeeter,
        metadata: record?.items[0]
          ? (record.items[0].parsedContent as DaoProfileYeeter)
          : ({
              daoId: daoId,
            } as unknown as DaoProfileYeeter),
      };
    },
    { enabled: !!shamanAddress && !!chainId && !!daoId }
  );

  return {
    ...data,
    ...rest,
  };
};

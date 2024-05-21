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
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsFull,
  calcYeetReachedGoal,
  formatTimeRemaining,
} from "../utils/yeetDataHelpers";
import { YeeterItem, YeeterMetadata } from "../utils/types";
import { createPublicClient, http } from "viem";

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

        console.log("res.yeeter.vault", res.yeeter.vault);
        console.log("safeBalance", bal);
      }

      const isComingSoon = res.yeeter && calcYeetIsComingSoon(res.yeeter);
      const yeeter = {
        ...res.yeeter,
        safeBalance,
        isActive: res.yeeter && calcYeetIsActive(res.yeeter),
        isEnded: res.yeeter && calcYeetIsEnded(res.yeeter),
        isComingSoon: isComingSoon,
        reachedGoal: res.yeeter && calcYeetReachedGoal(safeBalance, res.yeeter),
        timeRemaining:
          res.yeeter && isComingSoon
            ? formatTimeRemaining(res.yeeter)
            : "Finished",
      } as YeeterItem;

      return {
        yeeter,
        metadata: record?.items[0]
          ? (record.items[0].parsedContent as DaoProfile)
          : ({
              daoId: daoId,
            } as DaoProfile),
      };
    },
    { enabled: !!shamanAddress && !!chainId && !!daoId }
  );

  return {
    ...data,
    ...rest,
  };
};

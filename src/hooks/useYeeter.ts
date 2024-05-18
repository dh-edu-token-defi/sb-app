import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_YEETER } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { DaoProfile, listRecords } from "@daohaus/moloch-v3-data";
import {
  calcYeetIsActive,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsFull,
  formatTimeRemaining,
} from "../utils/yeetDataHelpers";
import { YeeterItem, YeeterMetadata } from "../utils/types";

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
      if (chainId) {
        record = await listRecords({
          networkId: chainId,
          filter: { dao: daoId, table: "daoProfile" },
        });
      }

      // TODO: add safe balance + percent complete from goal
      // // need safe address (not in yeeter subgraph)
      const isComingSoon = res.yeeter && calcYeetIsComingSoon(res.yeeter);
      const yeeter = {
        ...res.yeeter,
        isActive: res.yeeter && calcYeetIsActive(res.yeeter),
        isEnded: res.yeeter && calcYeetIsEnded(res.yeeter),
        isComingSoon: isComingSoon,
        isFull: res.yeeter && calcYeetIsFull(res.yeeter),
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

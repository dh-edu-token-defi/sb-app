import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_YEETER } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { listRecords } from "@daohaus/moloch-v3-data";
import {
  calcYeetIsActive,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
  calcYeetIsFull,
} from "../utils/yeetDataHelpers";
import { YeeterItem, YeeterMetadata } from "../utils/types";

export const useYeeter = ({
  chainId,
  daoId,
  shamanAddress,
}: {
  chainId?: ValidNetwork;
  daoId?: string;
  shamanAddress?: string;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    ["get-yeeter", { shamanAddress }],
    async () => {
      const res = (await graphQLClient.request(GET_YEETER, {
        shamanAddress: shamanAddress?.toLowerCase(),
      })) as { yeeter: YeeterItem };
      let record;
      if (chainId) {
        record = await listRecords({
          networkId: chainId,
          filter: { dao: daoId, table: "yeetDetails" },
        });
      }
      const yeeter = {
        ...res.yeeter,
        isActive: res.yeeter && calcYeetIsActive(res.yeeter),
        isEnded: res.yeeter && calcYeetIsEnded(res.yeeter),
        isComingSoon: res.yeeter && calcYeetIsComingSoon(res.yeeter),
        isFull: res.yeeter && calcYeetIsFull(res.yeeter),
      } as YeeterItem;

      return {
        yeeter,
        metadata: record?.items[0]
          ? (record.items[0].parsedContent as YeeterMetadata)
          : ({
              daoId: daoId,
            } as YeeterMetadata),
      };
    },
    { enabled: !!shamanAddress && !!chainId && !!daoId }
  );

  return {
    ...data,
    ...rest,
  };
};

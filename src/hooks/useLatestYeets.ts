import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { LATEST_YEETS } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";

export const useLatestYeets = ({ chainId }: { chainId?: string }) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    ["list-latest-yeets", { chainId }],
    async () => {
      const res = await graphQLClient.request(LATEST_YEETS);

      // @ts-expect-error
      return res?.yeets as YeetsItem[];
    },
    { enabled: !!chainId }
  );

  return {
    yeets: data,
    ...rest,
  };
};

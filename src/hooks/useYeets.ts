import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { LIST_YEETS } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";

export const useYeets = ({
  chainId,
  shamanAddress,
}: {
  chainId?: string;
  shamanAddress?: string;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    ["list-yeets", { shamanAddress }],
    async () => {
      const res = await graphQLClient.request(LIST_YEETS, {
        shamanAddress: shamanAddress?.toLowerCase(),
      });

      // @ts-expect-error
      return res?.yeets;
    },
    { enabled: !!shamanAddress && !!chainId }
  );

  return {
    yeets: data,
    ...rest,
  };
};

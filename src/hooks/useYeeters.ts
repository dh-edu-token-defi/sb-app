import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_YEETERS } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";

export const useYeeters = ({ chainId }: { chainId?: string }) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    [`get-yeeters-${chainId}`, { chainId }],
    async () => {
      const res = await graphQLClient.request(GET_YEETERS);

      // @ts-expect-error
      return res.yeeters;
    },
    { enabled: !!chainId }
  );

  return {
    yeeters: data,
    ...rest,
  };
};

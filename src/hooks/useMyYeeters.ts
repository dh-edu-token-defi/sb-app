import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { LIST_MY_YEETS } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";

export const useMyYeeters = ({
  chainId,
  account,
}: {
  chainId?: string;
  account?: string;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(YEETER_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    [`get-my-yeeters`, { chainId, account }],
    async () => {
      const res = await graphQLClient.request(LIST_MY_YEETS, { account });

      // @ts-expect-error
      return res.yeets;
    },
    { enabled: !!chainId && !!account }
  );

  const uniqYeeters = data
    ? data.reduce(
        // @ts-expect-error
        (acc, yeet) => {
          if (acc.ids[yeet.yeeter.id]) {
            return acc;
          } else {
            acc.ids[yeet.yeeter.id] = true;
            acc.yeeters.push(yeet.yeeter);

            return acc;
          }
        },
        { ids: {}, yeeters: [] }
      )
    : { ids: {}, yeeters: [] };

  return {
    myYeeters: uniqYeeters.yeeters,
    ...rest,
  };
};

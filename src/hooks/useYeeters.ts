import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_YEETERS } from "../utils/graphQueries";
import { YEETER_GRAPH_URL, getValidChainId } from "../utils/constants";
import { YeeterItem } from "../utils/types";
import {
  calcYeetIsActive,
  calcYeetIsComing,
  calcYeetIsComingSoon,
  calcYeetIsEnded,
} from "../utils/yeetDataHelpers";

type SortedYeeters = {
  activeYeeters: YeeterItem[];
  upcomingYeeters: YeeterItem[];
  finishedYeeters: YeeterItem[];
};

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

  const { activeYeeters, upcomingYeeters, finishedYeeters } = data
    ? data.reduce(
        (acc: SortedYeeters, yeeter: YeeterItem) => {
          if (calcYeetIsActive(yeeter)) {
            acc.activeYeeters.push(yeeter);
          }
          if (calcYeetIsEnded(yeeter)) {
            acc.finishedYeeters.push(yeeter);
          }
          if (calcYeetIsComing(yeeter)) {
            acc.upcomingYeeters.push(yeeter);
          }
          return acc;
        },
        {
          activeYeeters: [],
          upcomingYeeters: [],
          finishedYeeters: [],
        }
      )
    : {
        activeYeeters: [],
        upcomingYeeters: [],
        finishedYeeters: [],
      };

  return {
    allYeeters: data,
    activeYeeters,
    upcomingYeeters,
    finishedYeeters,
    ...rest,
  };
};

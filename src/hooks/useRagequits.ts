import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_RAGEQUITS, GET_RAGEQUITS_DAO } from "../utils/graphQueries";
import { DH_GRAPH_URL, getValidChainId } from "../utils/constants";
import { RagequitItem } from "../utils/types";

export const useRagequits = ({
  chainId,
  daoId,
}: {
  chainId?: string;
  daoId?: string;
}) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(DH_GRAPH_URL[chain]);

  const query = daoId ? GET_RAGEQUITS_DAO : GET_RAGEQUITS;
  const options = daoId ? { daoId } : undefined;
  const queryKey = daoId ? `list-ragequits-${daoId}` : "list-ragequits";

  const { data, ...rest } = useQuery(
    [queryKey],
    async () => {
      const res = await graphQLClient.request(query, options);

      // console.log;

      // @ts-expect-error
      return res?.rageQuits as RagequitItem[];
    },
    { enabled: !!chainId }
  );

  return {
    ragequits: data,
    ...rest,
  };
};

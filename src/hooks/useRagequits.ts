import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { GET_RAGEQUITS } from "../utils/graphQueries";
import { DH_GRAPH_URL, getValidChainId } from "../utils/constants";
import { ENDPOINTS } from "@daohaus/keychain-utils";
import { RagequitItem } from "../utils/types";

export const useRagequits = ({ chainId }: { chainId?: string }) => {
  const chain = getValidChainId(chainId);
  const graphQLClient = new GraphQLClient(DH_GRAPH_URL[chain]);

  const { data, ...rest } = useQuery(
    ["list-ragequits"],
    async () => {
      const res = await graphQLClient.request(GET_RAGEQUITS);

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

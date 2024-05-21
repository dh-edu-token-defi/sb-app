import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

import { LATEST_YEETS } from "../utils/graphQueries";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  YEET24_NAME,
  YEETER_GRAPH_URL,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import marketMakerShamanAbi from "../abis/marketMaker.json";

export const useMarketMaker = ({
  chainId,
  daoId,
  daoShamans,
  yeeterShamanAddress,
}: {
  chainId?: string;
  daoId?: string;
  daoShamans?: Array<string | undefined>;
  yeeterShamanAddress?: string;
}) => {
  const chain = getValidChainId(chainId);
  const shamanAddresses = daoShamans || [];

  const { data, ...rest } = useQuery(
    ["market-maker", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });

      let marketMakerShaman;
      for (let i = 0; i < shamanAddresses.length; i++) {
        if (yeeterShamanAddress && shamanAddresses[i] === yeeterShamanAddress) {
          continue;
        }
        const shamanName = await publicClient.readContract({
          address: shamanAddresses[i] as `0x${string}`,
          abi: marketMakerShamanAbi,
          functionName: "name",
        });

        if (shamanName === YEET24_NAME) {
          marketMakerShaman = shamanAddresses[0];
          break;
        }
      }

      //what else?
      // weth, nonfunginblepositionmanager

      // const shamanName = await publicClient.readContract({
      //   address: daoShamans[0] as `0x${string}`,
      //   abi: marketMakerShamanAbi,
      //   functionName: "name",
      // });

      // console.log("shamanName", shamanName);

      return { marketMakerShaman };
    },
    { enabled: !!chainId && !!daoId && !!daoShamans }
  );

  return {
    ...data,
    ...rest,
  };
};

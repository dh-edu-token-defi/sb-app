import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import yeeterShamanAbi from "../abis/yeeterShaman.json";



export const useYeeter = ({
  chainId,
  daoId,
  shamanAddress,
}: {
  chainId?: string;
  daoId?: string;
  shamanAddress?: string;
}) => {
  const chain = getValidChainId(chainId);

  const { data, ...rest } = useQuery(
    ["yeeter", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });


      const minTribute = (await publicClient.readContract({
        address: shamanAddress as `0x${string}`,
        abi: yeeterShamanAbi,
        functionName: "minTribute",
      })) as string;

      const multiplier = (await publicClient.readContract({
        address: shamanAddress as `0x${string}`,
        abi: yeeterShamanAbi,
        functionName: "multiplier",
      })) as string;
      
      
      return {
        minTribute,
        multiplier
      };
    },
    { enabled: !!chainId && !!daoId }
  );

  return {
    ...data,
    ...rest,
  };
};

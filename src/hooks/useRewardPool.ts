import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import claimModuleAbi from "../abis/claimModule.json";

export const useRewardPool = ({
  chainId,
  claimModuleAddress,
}: {
  chainId?: string;

  claimModuleAddress?: string;
}) => {
  const chain = getValidChainId(chainId);

  const { data, ...rest } = useQuery(
    ["reward-pool", { chainId, claimModuleAddress }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });

      let maxReward, rewardPercent, shamanTemplateId, hos, balance;

      maxReward = (await publicClient.readContract({
        address: claimModuleAddress as `0x${string}`,
        abi: claimModuleAbi,
        functionName: "maxReward",
      })) as BigInt;

      rewardPercent = (await publicClient.readContract({
        address: claimModuleAddress as `0x${string}`,
        abi: claimModuleAbi,
        functionName: "rewardPercent",
      })) as string;

      shamanTemplateId = (await publicClient.readContract({
        address: claimModuleAddress as `0x${string}`,
        abi: claimModuleAbi,
        functionName: "shamanTemplateId",
      })) as string;

      hos = (await publicClient.readContract({
        address: claimModuleAddress as `0x${string}`,
        abi: claimModuleAbi,
        functionName: "hos",
      })) as string;

      // get eth balance of contract
        balance = (await publicClient.getBalance({address: claimModuleAddress as `0x${string}`}));

      return {
        maxReward,
        rewardPercent,
        shamanTemplateId,
        hos,
        balance,
      };
    },
    { enabled: !!chainId && !!claimModuleAddress
    }
  );

  return {
    ...data,
    ...rest,
  };
};

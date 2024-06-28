import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  UNISWAP_URL,
  YEET24_NAME,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import marketMakerShamanAbi from "../abis/marketMaker.json";
import { calcMMIsOver } from "../utils/yeetDataHelpers";

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

      let marketMakerShaman,
        goalAchieved,
        executed,
        pool,
        uniswapUrl,
        endTime,
        finalEthBalance;
      let canExecute = false;
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
          marketMakerShaman = shamanAddresses[i];

          executed = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: marketMakerShamanAbi,
            functionName: "executed",
          })) as boolean;

          goalAchieved = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: marketMakerShamanAbi,
            functionName: "goalAchieved",
          })) as boolean;

          pool = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: marketMakerShamanAbi,
            functionName: "pool",
          })) as string;

          endTime = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: marketMakerShamanAbi,
            functionName: "endTime",
          })) as string;

          finalEthBalance = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: marketMakerShamanAbi,
            functionName: "balance",
          })) as string;

          canExecute = !executed && calcMMIsOver(endTime);

          if (executed && pool) {
            uniswapUrl = `${UNISWAP_URL[DEFAULT_CHAIN_ID]}${pool}`;
          }

          break;
        }
      }

      return {
        marketMakerShaman,
        goalAchieved,
        executed,
        pool,
        canExecute,
        uniswapUrl,
        endTime,
        finalEthBalance,
      };
    },
    { enabled: !!chainId && !!daoId && !!daoShamans }
  );

  return {
    ...data,
    ...rest,
  };
};

import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  UNISWAP_URL,
  SHAMAN_MODULE_NAME,
  getValidChainId,
  CURATOR_CONTRACTS,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import nounsTokenAbi from "../abis/nounsToken.json";
import { ValidNetwork } from "@daohaus/keychain-utils";

export const useTreasury = ({
  chainId,
  daoId,
  treasuryAddress,
}: {
  chainId: string;
  daoId?: string;
  treasuryAddress?: string;
}) => {
  const chain = getValidChainId(chainId);

  const nounsToken = CURATOR_CONTRACTS["NOUNS_TOKEN"][chainId as ValidNetwork];

  const { data, ...rest } = useQuery(
    ["treasury", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });

      let votesToDelegate, nounsBalance, treasuryEthBalance;
      let nouns: number[] = [];

      votesToDelegate = (await publicClient.readContract({
        address: nounsToken as `0x${string}`,
        abi: nounsTokenAbi,
        functionName: "votesToDelegate",
        args: [treasuryAddress],
      })) as number;

      nounsBalance = (await publicClient.readContract({
        address: nounsToken as `0x${string}`,
        abi: nounsTokenAbi,
        functionName: "balanceOf",
        args: [treasuryAddress],
      })) as number;

      let promises = [];
      for (let i = 0; i < nounsBalance; i++) {
        promises.push(
          publicClient.readContract({
            address: nounsToken as `0x${string}`,
            abi: nounsTokenAbi,
            functionName: "tokenOfOwnerByIndex",
            args: [treasuryAddress, i],
          }) as Promise<number>
        );
      }

      nouns = await Promise.all(promises);

      treasuryEthBalance = await publicClient.getBalance({ address: treasuryAddress as `0x${string}`});

        return {
            votesToDelegate,
            nounsBalance,
            treasuryEthBalance,
            nouns,
        };


    },
    { enabled: !!chainId && !!daoId && !!treasuryAddress }
  );

  return {
    ...data,
    ...rest,
  };
};

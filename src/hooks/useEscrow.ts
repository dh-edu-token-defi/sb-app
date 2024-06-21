import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  NFT_ESCROW_NAME,
  RPC_URLS,
  YEET24_NAME,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import nftEscrowShamanAbi from "../abis/nftEscrow.json";

export const useEscrow = ({
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
    ["nft-escrow", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });

      let nftEscrowShaman, goalAchieved, executed, seller, nftAddress, tokenId;
      let canExecute = false;
      for (let i = 0; i < shamanAddresses.length; i++) {
        if (yeeterShamanAddress && shamanAddresses[i] === yeeterShamanAddress) {
          continue;
        }
        const shamanName = await publicClient.readContract({
          address: shamanAddresses[i] as `0x${string}`,
          abi: nftEscrowShamanAbi,
          functionName: "name",
        });

        console.log("shamanName", i, shamanName);

        if (shamanName === NFT_ESCROW_NAME) {
          console.log("true..........")
          nftEscrowShaman = shamanAddresses[i];

          executed = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: nftEscrowShamanAbi,
            functionName: "executed",
          })) as boolean;

          seller = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: nftEscrowShamanAbi,
            functionName: "seller",
          })) as string;

          nftAddress = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: nftEscrowShamanAbi,
            functionName: "nftAddress",
          })) as string;

          tokenId = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: nftEscrowShamanAbi,
            functionName: "tokenId",
          })) as string;

          canExecute = (await publicClient.readContract({
            address: shamanAddresses[i] as `0x${string}`,
            abi: nftEscrowShamanAbi,
            functionName: "canExecute",
          })) as boolean;


          break;
        }
      }

      return {
        nftEscrowShaman,
        goalAchieved,
        executed,
        seller,
        nftAddress,
        tokenId,
        canExecute,

      };
    },
    { enabled: !!chainId && !!daoId && !!daoShamans }
  );

  return {
    ...data,
    ...rest,
  };
};

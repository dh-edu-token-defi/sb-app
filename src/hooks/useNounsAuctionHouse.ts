import { useQuery } from "react-query";
import {
  CHAIN_OBJ,
  DEFAULT_CHAIN_ID,
  RPC_URLS,
  getValidChainId,
} from "../utils/constants";
import { createPublicClient, http } from "viem";
import nounsAuctionHouseAbi from "../abis/nounsAuctionHouse.json";

interface Auction {
  nounId: number;
  amount: number;
  startTime: number;
  endTime: number;
  bidder: string;
  settled: boolean;
}

export const useNounsAuctionHouse = ({
  chainId,
  daoId,
  auctionHouseAddress,
}: {
  chainId?: string;
  daoId?: string;
  auctionHouseAddress?: string;
}) => {
  const chain = getValidChainId(chainId);

  const { data, ...rest } = useQuery(
    ["nouns-auction-house", { chainId, daoId }],
    async () => {
      const publicClient = createPublicClient({
        chain: CHAIN_OBJ[chain],
        transport: http(RPC_URLS[chain]),
      });


      const auctionData = (await publicClient.readContract({
        address: auctionHouseAddress as `0x${string}`,
        abi: nounsAuctionHouseAbi,
        functionName: "auction",
      })) as [
        number, // nounId
        number, // amount
        number, // startTime
        number, // endTime
        string, // bidder
        boolean // settled
      ];
      
      const auction: Auction = {
        nounId: auctionData[0],
        amount: auctionData[1],
        startTime: auctionData[2],
        endTime: auctionData[3],
        bidder: auctionData[4],
        settled: auctionData[5],
      };
      
      
      return {
        auction
      };
    },
    { enabled: !!chainId && !!daoId }
  );

  return {
    ...data,
    ...rest,
  };
};

import { ContractLego } from "@daohaus/utils";

import yeet24SummonerAbi from "../abis/yeet24Summoner.json";
import yeeterShamanAbi from "../abis/yeeterShaman.json";
import nftEscrowShamanAbi from "../abis/nftEscrow.json";

import { CURATOR_CONTRACTS } from "../utils/constants";
import { LOCAL_ABI } from "@daohaus/abis";

export const APP_CONTRACT: Record<string, ContractLego> = {
  YEETNFTESCROW_SUMMONER: {
    type: "static",
    contractName: "YeetNftEscrowSummoner",
    abi: yeet24SummonerAbi,
    targetAddress: CURATOR_CONTRACTS["YEETNFTESCROW_SUMMONER"],
  },
  YEETER_SHAMAN: {
    type: "static",
    contractName: "Yeet24Summoner",
    abi: yeeterShamanAbi,
    targetAddress: ".shamanAddress",
  },
  MARKET_MAKER_SHAMAN: {
    type: "static",
    contractName: "nftEscrowShaman",
    abi: nftEscrowShamanAbi,
    targetAddress: ".nftEscrowShaman",
  },
  EXIT_DAO: {
    type: "static",
    contractName: "Baal",
    abi: LOCAL_ABI.BAAL,
    targetAddress: ".dao.id",
  },
};

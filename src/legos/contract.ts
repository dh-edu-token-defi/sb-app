import { ContractLego } from "@daohaus/utils";

import yeet24SummonerAbi from "../abis/yeet24Summoner.json";
import yeeterShamanAbi from "../abis/yeeterShaman.json";
import marketMakerShamanAbi from "../abis/marketMaker.json"

import { CURATOR_CONTRACTS } from "../utils/constants";
import { LOCAL_ABI } from "@daohaus/abis";

export const APP_CONTRACT: Record<string, ContractLego> = {
  YEET24_SUMMONER: {
    type: "static",
    contractName: "Yeet24Summoner",
    abi: yeet24SummonerAbi,
    targetAddress: CURATOR_CONTRACTS["YEET24_SUMMONER"],
  },
  YEETER_SHAMAN: {
    type: "static",
    contractName: "Yeet24Summoner",
    abi: yeeterShamanAbi,
    targetAddress: ".shamanAddress",
  },
  MARKET_MAKER_SHAMAN: {
    type: "static",
    contractName: "MarketMakerShaman",
    abi: marketMakerShamanAbi,
    targetAddress: ".marketMakerShaman",
  },
  EXIT_DAO: {
    type: "static",
    contractName: "Baal",
    abi: LOCAL_ABI.BAAL,
    targetAddress: ".dao.id",
  },
  POSTER: {
    type: "static",
    contractName: "Poster",
    abi: LOCAL_ABI.POSTER,
    targetAddress: CURATOR_CONTRACTS["POSTER"],
  },
};

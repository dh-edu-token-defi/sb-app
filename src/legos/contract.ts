import { ContractLego } from "@daohaus/utils";

import yeet24SummonerAbi from "../abis/yeet24Summoner.json";
import { CURATOR_CONTRACTS } from "../utils/constants";

export const APP_CONTRACT: Record<string, ContractLego> = {
  YEET24_SUMMONER: {
    type: "static",
    contractName: "Yeet24Summoner",
    abi: yeet24SummonerAbi,
    targetAddress: CURATOR_CONTRACTS["YEET24_SUMMONER"],
  },
};

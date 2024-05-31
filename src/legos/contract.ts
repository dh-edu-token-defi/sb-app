import { ContractLego } from "@daohaus/utils";

import yeet24SummonerAbi from "../abis/yeet24Summoner.json";
import { CURATOR_CONTRACTS } from "../utils/constants";

export const APP_CONTRACT: Record<string, ContractLego> = {
  YEETNFTESCROW_SUMMONER: {
    type: "static",
    contractName: "YeetNftEscrowSummoner",
    abi: yeet24SummonerAbi,
    targetAddress: CURATOR_CONTRACTS["YEETNFTESCROW_SUMMONER"],
  },
};

import { POSTER_TAGS } from "@daohaus/utils";
import { buildMultiCallTX } from "@daohaus/tx-builder";
import { APP_CONTRACT } from "./contract";
import { pollLastTX, pollYeet, testLastTX, testYeet } from "../utils/customTxPoll";

export enum ProposalTypeIds {
  Signal = "SIGNAL",
  IssueSharesLoot = "ISSUE",
  AddShaman = "ADD_SHAMAN",
  TransferErc20 = "TRANSFER_ERC20",
  TransferNetworkToken = "TRANSFER_NETWORK_TOKEN",
  UpdateGovSettings = "UPDATE_GOV_SETTINGS",
  UpdateTokenSettings = "TOKEN_SETTINGS",
  TokensForShares = "TOKENS_FOR_SHARES",
  GuildKick = "GUILDKICK",
  WalletConnect = "WALLETCONNECT",
}

export const APP_TX = {
  SUMMON_MEME: {
    id: "SUMMON_MEME",
    contract: APP_CONTRACT.YEET24_SUMMONER,
    method: "summonBaalFromReferrer",
    argCallback: "assembleMemeSummonerArgs",
    customPoll: {
      fetch: pollLastTX,
      test: testLastTX,
    },
  },
  YEET: {
    id: "YEET",
    contract: APP_CONTRACT.YEETER_SHAMAN,
    method: "contributeEth",
    args: [".formValues.message"],
    overrides: {
      value: ".formValues.amount",
    },
    customPoll: {
      fetch: pollYeet,
      test: testYeet,
    },
  },
  EXECUTE_LP: {
    id: "EXECUTE_LP",
    contract: APP_CONTRACT.MARKET_MAKER_SHAMAN,
    method: "execute",
    args: [],
    // customPoll: {
    //   fetch: pollYeet,
    //   test: testYeet,
    // },
  },
  EXIT_PRESALE: {
    id: "EXIT_PRESALE",
    contract: APP_CONTRACT.EXIT_DAO,
    method: "ragequit",
    args: [
      '.formValues.to',
      '.formValues.sharesToBurn',
      '.formValues.lootToBurn',
      '.formValues.tokens',
    ],
    // customPoll: {
    //   fetch: pollYeet,
    //   test: testYeet,
    // },
  },
  YEET_COMMENT: {
      id: "YEET_COMMENT",
      contract: APP_CONTRACT.POSTER,
      method: 'post',
      args: [
        {
          type: 'JSONDetails',
          jsonSchema: {
            daoId: ".daoId",
            table: { type: 'static', value: 'COMMENT' },
            queryType: { type: 'static', value: 'list' },
            content: '.formValues.content',
            authorAddress: '.memberAddress',
            createdAt: '.formValues.createdAt',
            chainId: ".chainId",
          },
        },
        { type: 'static', value: POSTER_TAGS.daoDatabaseSharesOrLoot },
      ],
    },
};

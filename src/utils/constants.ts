import { Chain, base, sepolia } from "viem/chains";

import {
  HAUS_NETWORK_DATA,
  HAUS_RPC,
  Keychain,
  KeychainList,
  NetworkConfig,
  ValidNetwork,
} from "@daohaus/keychain-utils";

export const APP_NAME = "SLOWBALL";

export const YEET24_REFERRER = "DHYeet24ShamanSummoner.5";
export const YEET24_NAME = "Yeet24ShamanModule";

export const CURATOR_CONTRACTS: KeychainList = {
  YEET24_SUMMONER: {
    "0xaa36a7": "0xde65e8b424438b361d8f4a8896f92956510b08dc", // "0x78cf150b2E684562C0510C0b699edE1DCD69b983",
    "0x2105": "0xe6eB99FaB27bE81D5F5F4dC44fCdf508a1B97Cd3" // "0x788C55D87a416F391E93a986AbB1e2b2960d0079",
  },
  YEETER_SINGLETON: {
    "0xaa36a7": "0x62ff4ca410e9e58f5ce8b2ad03695ef0ad990381",
    "0x2105": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
  },
  YEET24_SINGLETON: {
    "0xaa36a7": "0x9CA5ABC37BE4716A494E958d7404DE19cad9d858", //"0x59a7C71221d05e30b9d7981AB83f0A1700e51Af8",
    "0x2105": "0xcbcdce90ddaf50739dfb90b84e9b84a312b0a4e5" // "0x2f3637757875414c938EF80A5aD197aAaCDaA924",
  },
  YEET24_CLAIM_MODULE: {
    "0xaa36a7": "0xDC38DB792fFf0d7E321411DC03D80d8C9c0AC836",
    "0x2105": "0xc5ec2eabfd8d1a1e38896ad2ec1d452f66dac761",
  },
  GOV_LOOT_SINGLETON: {
    "0xaa36a7": "0x8a4a9e36106ee290811b89e06e2fafe913507965",
    "0x2105": "0x59a7C71221d05e30b9d7981AB83f0A1700e51Af8",
  },
  DH_TOKEN_SINGLETON: {
    "0xaa36a7": "0x8a4a9e36106ee290811b89e06e2fafe913507965",
    "0x2105": "0xD2bA2c50D16D35d6B8642A06b2C882F9fe790EDD",
  },
  GNOSIS_SAFE_PROXY_FACTORY: {
    "0xaa36a7": "0xc22834581ebc8527d974f8a1c97e1bea4ef910bc",
    "0x2105": "0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC",
  },
  GNOSIS_SAFE_MASTER_COPY: {
    "0xaa36a7": "0x69f4d1788e39c87893c980c06edf4b7f686e2938",
    "0x2105": "0x69f4D1788e39c87893C980c06EdF4b7f686e2938",
  },
  UNISWAP_V3_NF_POSITION_MANAGER: {
    "0xaa36a7": "0x1238536071E1c677A632429e3655c799b22cDA52",
    "0x2105": "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
  },
  WETH: {
    "0xaa36a7": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    "0x2105": "0x4200000000000000000000000000000000000006",
  },
  POSTER: {
    "0xaa36a7": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x2105": "0x000000000000cd17345801aa8147b8d3950260ff",
  },
};

type KEYCHAIN = {
  [key: string]: string;
};

export const YEETER_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/8Syem3ZN88cut1wL8AqPHNo658Px7M2CkRuHAGuxvf6j`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/6vyAqRpCyrhLsfd6TfYAssvKywKhxJykkDbPxJZ4ZcEr`,
};

export const DH_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW`,
};

export const UNISWAP_URL: Keychain<string> = {
  "0xaa36a7": "https://app.uniswap.org/explore/pools/sepolia/",
  "0x2105": "https://app.uniswap.org/explore/pools/base/",
  "0xa": "https://app.uniswap.org/explore/pools/optimism",
};

export const supportedNetworks = import.meta.env.DEV
  ? {
      "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
      "0x2105": HAUS_NETWORK_DATA["0x2105"],
    }
  : {
      "0x2105": HAUS_NETWORK_DATA["0x2105"],
    };

export const targetNetworks: Keychain<NetworkConfig> = {
  "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
  "0x64": HAUS_NETWORK_DATA["0x64"],
  "0xa": HAUS_NETWORK_DATA["0xa"],
  "0xa4b1": HAUS_NETWORK_DATA["0xa4b1"],
  "0x2105": HAUS_NETWORK_DATA["0x2105"],
};
export const DEFAULT_CHAIN_ID_DEV = "0xaa36a7";
export const DEFAULT_CHAIN_ID_PROD = "0x2105";
export const DEFAULT_CHAIN_ID = import.meta.env.DEV
  ? DEFAULT_CHAIN_ID_DEV
  : DEFAULT_CHAIN_ID_PROD;

export const CHAIN_OBJ: {
  [key: string]: Chain;
} = {
  "0xaa36a7": sepolia,
  "0x2105": base,
};

export const RPC_URLS: KEYCHAIN = {
  "0xaa36a7": HAUS_RPC["0xaa36a7"],
  "0x2105": HAUS_RPC["0x2105"],
};

export const getValidChainId = (chainId?: string) => {
  return targetNetworks[chainId as ValidNetwork]?.chainId || DEFAULT_CHAIN_ID;
};
const POINT_O_ONE_ETH = "10000000000000000";
const POINT_OO_ONE_ETH = "1000000000000000";
const GOAL_ETH = "1000000000000000000";

export const SPONSOR_THRESHOLD = POINT_O_ONE_ETH;
export const YEETER_SHAMAN_PERMISSIONS = "2";
export const MEME_SHAMAN_PERMISSIONS = "3";
export const LOOT_NAME_POSTFIX = " Community Power";
export const LOOT_SYMBOL_PREFIX = "LOOT-";

export const DEFAULT_YEETER_VALUES_DEV = {
  isShares: true,
  feeRecipients: [
    "0xD0f8720846890a7961945261FE5012E4cA39918e",
    "0x4a9a27d614a74ee5524909ca27bdbcbb7ed3b315",
  ], // yeeter team, daohaus eco fund
  feeAmounts: ["5000", "5000"], // .5% fees
  multiplier: "10000",
  minThresholdGoal: POINT_O_ONE_ETH,
};
export const DEFAULT_YEETER_VALUES_PROD = {
  isShares: true,
  feeRecipients: [
    "0xD0f8720846890a7961945261FE5012E4cA39918e",
    "0x4a9a27d614a74ee5524909ca27bdbcbb7ed3b315",
  ], // yeeter team, daohaus eco fund
  feeAmounts: ["5000", "5000"], // .5% fees
  multiplier: "10000",
  minThresholdGoal: GOAL_ETH,
};

export const DEFAULT_DURATION_PROD = (4*24) * 60 * 60; // 4 days
export const DEFAULT_DURATION_DEV = 10 * 60; // 10 minutes

const STATUS_WINDOW_LENGTH_DEV = 3 * 60; // 3 mins
const STATUS_WINDOW_LENGTH_PROD = 2 * 60 * 60; // 2 hrs

export const DEFAULT_MEME_YEETER_VALUES = {
  poolFee: "10000", // 1%
  boostRewardFees: "90000", // 9%
};

//

export const DEFAULT_SUMMON_VALUES_DEV = {
  votingPeriodInSeconds: 200,
  gracePeriodInSeconds: 6,
  newOffering: POINT_OO_ONE_ETH,
  quorum: "25",
  sponsorThreshold: SPONSOR_THRESHOLD,
  minRetention: "66",
  votingTransferable: false,
  nvTransferable: true,
};
export const DEFAULT_SUMMON_VALUES_PROD = {
  votingPeriodInSeconds: 259200,
  gracePeriodInSeconds: 172800,
  newOffering: POINT_O_ONE_ETH,
  quorum: "25",
  sponsorThreshold: SPONSOR_THRESHOLD,
  minRetention: "66",
  votingTransferable: false,
  nvTransferable: true,
};

export const DEFAULT_YEETER_VALUES = import.meta.env.DEV
  ? DEFAULT_YEETER_VALUES_DEV
  : DEFAULT_YEETER_VALUES_PROD;
    // : DEFAULT_YEETER_VALUES_PROD;

export const DEFAULT_DURATION = import.meta.env.DEV
  ? DEFAULT_DURATION_DEV
  : DEFAULT_DURATION_PROD;
    // : DEFAULT_DURATION_PROD;

export const STATUS_WINDOW_LENGTH = import.meta.env.DEV
  ? STATUS_WINDOW_LENGTH_DEV
  : STATUS_WINDOW_LENGTH_PROD;
    // : STATUS_WINDOW_LENGTH_PROD;

export const DEFAULT_SUMMON_VALUES = import.meta.env.DEV
  ? DEFAULT_SUMMON_VALUES_DEV
  : DEFAULT_SUMMON_VALUES_PROD;
    // : DEFAULT_SUMMON_VALUES_PROD;

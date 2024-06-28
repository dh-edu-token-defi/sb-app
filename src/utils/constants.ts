import { Chain, base, sepolia } from "viem/chains";

import {
  HAUS_NETWORK_DATA,
  HAUS_RPC,
  Keychain,
  KeychainList,
  NetworkConfig,
  ValidNetwork,
} from "@daohaus/keychain-utils";

export const APP_NAME = "SPEEDBALL";

export const YEET24_REFERRER = "DHYeet24ShamanSummoner.4";
export const YEET24_NAME = "Yeet24ShamanModule";

export const CURATOR_CONTRACTS: KeychainList = {
  YEET24_SUMMONER: {
    "0xaa36a7": "0x78cf150b2E684562C0510C0b699edE1DCD69b983",
    "0x2105": "0x788C55D87a416F391E93a986AbB1e2b2960d0079",
  },
  YEETER_SINGLETON: {
    "0xaa36a7": "0x62ff4ca410e9e58f5ce8b2ad03695ef0ad990381",
    "0x2105": "0x8D60971eFf778966356c1cADD76d525E7B25cc6b",
  },
  YEET24_SINGLETON: {
    "0xaa36a7": "0x69eEA5adD040311C0aABb41C772423b87fadF32A",
    "0x2105": "0x885F45A8F5227FC11f17a007cb058Bd8f4c858bE",
  },
  FIXED_LOOT_SINGLETON: {
    // "0x1": "0x9d42696a9c3c54952b8918dcbcb82dd710347c77",
    // "0x5": "0x9d42696a9c3c54952b8918dcbcb82dd710347c77",
    // "0xa": "0x8dd2ca9f0ae4f464bf5a0c2283fc5c84f16f2f8e",
  },
  GOV_LOOT_SINGLETON: {
    // "0x1": "0xbdf2bd70d5dc78dce008b337d889b50c217c6eb7",
    // "0x5": "0xbdf2bd70d5dc78dce008b337d889b50c217c6eb7",
    // "0xa": "0x1597e36560a4935e8ba40520d2f3037fd111054c",
    "0xaa36a7": "0x8a4a9e36106ee290811b89e06e2fafe913507965",
    "0x2105": "0x59a7C71221d05e30b9d7981AB83f0A1700e51Af8",
  },
  GNOSIS_SAFE_PROXY_FACTORY: {
    // "0x1": "0xa6b71e26c5e0845f74c812102ca7114b6a896ab2",
    // "0x5": "0xa6b71e26c5e0845f74c812102ca7114b6a896ab2",
    // "0xa": "0xc22834581ebc8527d974f8a1c97e1bea4ef910bc",
    "0xaa36a7": "0xc22834581ebc8527d974f8a1c97e1bea4ef910bc",
    "0x2105": "0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC",
  },
  GNOSIS_SAFE_MASTER_COPY: {
    // "0x1": "0xd9db270c1b5e3bd161e8c8503c55ceabee709552",
    // "0x5": "0xd9db270c1b5e3bd161e8c8503c55ceabee709552",
    // "0xa": "0xfb1bffc9d739b8d520daf37df666da4c687191ea", // "0xd9db270c1b5e3bd161e8c8503c55ceabee709552",
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
    "0x1": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x5": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x64": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0xa": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0xaa36a7": "0x000000000000cd17345801aa8147b8d3950260ff",
    "0x2105": "0x000000000000cd17345801aa8147b8d3950260ff",
  },
};

/// https://docs.tokenbound.org/contracts/deployments

type KEYCHAIN = {
  [key: string]: string;
};

export const YEETER_GRAPH_URL: KEYCHAIN = {
  // "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
  //   import.meta.env.VITE_YEETER_GRAPH_API_KEY
  // }/subgraphs/id/8Syem3ZN88cut1wL8AqPHNo658Px7M2CkRuHAGuxvf6j`,
  "0xaa36a7": `https://api.studio.thegraph.com/query/73494/yeeter-sepolia/0.0.4`,
  "0x64": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/EGG5xEkiKKtGa9frTfBSmL2w7ZmzPDke5ZuvxDRwQcGe`,
  "0xa": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/55wEbRchfvjtWsy5NqLc4hp9C7xbX9yk8bAr3UQA8F7x`,
  "0xa4b1": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/BeGugH1TsMspZ7Nov1Uq2PQ98X78sqjuEy1JFGLyNgt5`,
  "0x2105": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/6vyAqRpCyrhLsfd6TfYAssvKywKhxJykkDbPxJZ4ZcEr`,
};

export const DH_GRAPH_URL: KEYCHAIN = {
  "0xaa36a7": `https://gateway-arbitrum.network.thegraph.com/api/${
    import.meta.env.VITE_YEETER_GRAPH_API_KEY
  }/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw`,
};

// '0x1':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/HouDe2pTdyKM9CTG1aodnPPPhm7U148BCH7eJ4HHwpdQ',
// '0x5': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli',
// '0x64':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/6x9FK3iuhVFaH9sZ39m8bKB5eckax8sjxooBPNKWWK8r',
// '0x89':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/A4su27JYXR5TkPZmiFHzzqMJnmYttfU3FyrdNBDnnu8T',
// '0xa':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/CgH5vtz9CJPdcSmD3XEh8fCVDjQjnRwrSawg71T1ySXW',
// '0xa4b1':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/GPACxuMWrrPSEJpFqupnePJNMfuArpFabrXLnWvXU2bp',
// '0xaa36a7':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw',
// '0x2105':
// 'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW',

export const UNISWAP_URL: Keychain<string> = {
  "0xaa36a7": "https://app.uniswap.org/explore/pools/base/",
  "0x2105": "https://app.uniswap.org/explore/pools/base/",
  "0xa": "https://app.uniswap.org/explore/pools/optimism",
};

export const supportedNetworks = import.meta.env.DEV
  ? {
      "0xaa36a7": HAUS_NETWORK_DATA["0xaa36a7"],
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
const GOAL_ETH = "3000000000000000000";

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

export const DEFAULT_DURATION_PROD = 48 * 60 * 60; // 48 hours
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

export const DEFAULT_DURATION = import.meta.env.DEV
  ? DEFAULT_DURATION_DEV
  : DEFAULT_DURATION_PROD;

export const STATUS_WINDOW_LENGTH = import.meta.env.DEV
  ? STATUS_WINDOW_LENGTH_DEV
  : STATUS_WINDOW_LENGTH_PROD;

export const DEFAULT_SUMMON_VALUES = import.meta.env.DEV
  ? DEFAULT_SUMMON_VALUES_DEV
  : DEFAULT_SUMMON_VALUES_PROD;

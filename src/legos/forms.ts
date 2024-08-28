import { TXLego } from "@daohaus/utils";
import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

export const APP_FORM: Record<string, CustomFormLego> = {
  CAPTAIN_NEW_BID_FORM: {
    id: "CAPTAIN_NEW_BID",
    title: "New Bid",
    description: "Create a new bid for the auction",
    submitButtonText: "BID",
    requiredFields: {
      maxBid: true,
    },
    log: true,
    tx: APP_TX.CAPTAIN_NEW_BID as TXLego,
    fields: [
      {
        id: "maxBid",
        type: "toWeiInput",
        label: "Max Bid Amount",
        placeholder: "0.01",
        expectType: "number",
        info: "The max amount you want to bid.",
      },
    ],
  },
  CAPTAIN_DELEGATE_FORM: {
    id: "CAPTAIN_DELEGATE",
    title: "Delegate",
    description: "Delegate the DAOs power to another address",
    submitButtonText: "DELEGATE",
    requiredFields: {
      delegate: true,
    },
    log: true,
    tx: APP_TX.CAPTAIN_DELEGATE as TXLego,
    fields: [
      {
        id: "delegate",
        type: "input",
        label: "Delegate Address",
        placeholder: "0x1234...5678",
      },
    ],
  },
  EXIT_PRESALE_FORM: {
    id: "EXIT_PRESALE",
    title: "Exit Presale",
    description: "Exit presale and lose your deposit",
    submitButtonText: "JEET",
    requiredFields: {
      amount: true,
    },
    log: true,
    tx: APP_TX.EXIT_PRESALE as TXLego,
    fields: [],
  },
  EXECUTE_LP_FORM: {
    id: "EXECUTE_LP",
    title: "Create the Uniswap Pool",
    log: true,
    tx: APP_TX.EXECUTE_LP as TXLego,
    fields: [],
  },
  CLOSE_YEET_FORM: {
    id: "CLOSE_YEET_FORM",
    title: "Close Yeet Campaiign",
    log: true,
    tx: APP_TX.EXECUTE_LP as TXLego,
    fields: [],
  },
  YEET_COMMENT: {
    id: "YEET_COMMENT",
    submitButtonText: "Comment",
    requiredFields: {
      content: true,
    },
    log: true,
    tx: APP_TX.YEET_COMMENT as TXLego,
    fields: [
      {
        id: "createdAt",
        type: "createdAt",
      },
      {
        id: "content",
        type: "mdxEditor",
        label: "Comment",
        placeholder: "Type your comment here",
      },
    ],
  },
  YEET_FORM: {
    id: "YEET",
    // title: "Buy",
    // description: "Buy into presale",
    requiredFields: {
      amount: true,
    },
    log: true,
    tx: APP_TX.YEET as TXLego,
    fields: [
      {
        id: "yeetHelper",
        type: "yeetHelper",
        label: "GET",
      },
      {
        id: "yeetSplit",
        type: "splitColumn",
        rows: [
          {
            rowId: "row1",
            left: {
              id: "amount",
              type: "yeetAmount",
              label: "YEET",
              expectType: "number",
            },
            right: {
              id: "yeetReturn",
              type: "yeetReturn",
            },
          },
        ],
      },
      {
        id: "message",
        type: "mdxEditor",
        label: "MESSAGE",
        placeholder: "yeet yeet yeet",
      },
    ],
  },
  SUMMON_AUCTIONHAUS: {
    id: "SUMMON_AUCTIONHAUS",
    title: "Create a Auktion HAUS",
    description:
      "Give your haus a name, symbol, and description. Set the initial price and start date.",
    submitButtonText: "Summon Token",
    requiredFields: {
      daoName: true,
      tokenSymbol: true,
      description: true,
      collectorPrice: true,
      startDate: true,
    },
    log: true,
    tx: APP_TX.SUMMON_AUCTIONHAUS,
    fields: [
      {
        id: "nameSegment",
        type: "formSegment",
        fields: [
          {
            id: "daoName",
            type: "input",
            label: "Token Name",
            placeholder: "A short name for the topic.",
          },
          {
            id: "description",
            type: "input",
            label: "Short Description",
            placeholder: "A short description of the DAO.",
          },
          {
            id: "tokenSymbol",
            type: "input",
            label: "Token Symbol",
            placeholder: "The token symbol for the token.",
          },
        ],
      },
      // {
      //   id: "collectorPrice",
      //   type: "toWeiInput",
      //   label: "Initial Price",
      //   placeholder: ".0069,420",
      //   expectType: "number",
      //   info: "The initial price (in chain native token ex. ETH) per 1000 tokens.",
      // },
      {
        id: "tribute",
        type: "splitColumn",
        rows: [
          {
            rowId: "row1",
            left: {
              id: "collectorPrice",
              type: "labeledToWei",
              label: "MINIMUM PRICE",
              placeholder: "0.01",
              expectType: "number",
              rules: {
                min: {
                  value: 10000000000000,
                  message: "Must be .00001 or more",
                },
              },
            },
            right: {
              id: "lootPerYeet",
              type: "lootPerYeetMod",
              label: "LOOT PER MINIMUM YEET",
              expectType: "number",
              rules: {
                min: {
                  value: 1,
                  message: "Must be 1 or more",
                },
              },
            },
          },
        ],
      },
      {
        id: "startDate",
        type: "dateWrapper",
        label: "Start Date",
      },
      {
        id: "image",
        type: "imagePreview",
        label: "Group Avatar",
        placeholder: "jpg, jpeg, gif or png imag",
        expectType: "url",
        info: "icon, gif, pfp or avatar.",
      },
      {
        id: "captain",
        type: "input",
        label: "Captains Address",
        placeholder: "0x1234...5678",
      },
      {
        id: "captainReward",
        type: "toWeiInput",
        label: "Captain Reward",
        placeholder: "69,420",
        expectType: "number",
        info: "The reward in shares a captain gets for participation in auctions.",
      },

      APP_FIELD.DISCLAIMER_CHECKBOX_FIELD,
      APP_FIELD.SALT_NONCE_FIELD,
      APP_FIELD.DAO_ADDRESS_FIELD,
      APP_FIELD.SHAMAN_ADDRESS_FIELD,
      APP_FIELD.MANAGER_ACCOUNT,
      APP_FIELD.PARAM_TAG_FIELD,
      // APP_FIELD.TAGS_MULTISELECT_FIELD,
    ],
  },
};

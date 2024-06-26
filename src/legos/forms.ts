import { TXLego } from "@daohaus/utils";
import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

export const APP_FORM: Record<string, CustomFormLego> = {
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
  YEET_FORM: {
    id: "YEET",
    title: "Buy",
    description: "Buy into presale",
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
  SUMMON_MEME: {
    id: "SUMMON_MEME",
    title: "Token Summoner",
    description:
      "Give your token a name, description, and initial price. You can also add an image and a longer introduction.",
    submitButtonText: "Summon Token",
    requiredFields: {
      daoName: true,
      tokenSymbol: true,
      description: true,
      collectorPrice: true,
      startDate: true,
    },
    log: true,
    tx: APP_TX.SUMMON_MEME,
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
      {
        id: "collectorPrice",
        type: "toWeiInput",
        label: "Initial Price",
        placeholder: ".0069,420",
        expectType: "number",
        info: "The initial price (in chain native token ex. ETH) per 1000 tokens.",
      },
      {
        id: "startDate",
        type: "epochDatePicker",
        label: "Start Date",
      },
      {
        id: "image",
        type: "imagePreview",
        label: "NFT Image Avatar",
        placeholder: "jpg, jpeg, gif or png imag",
        expectType: "url",
        info: "icon, gif, pfp or avatar.",
      },
      {
        id: "body",
        type: "mdxEditor",
        label: "Introduction",
        placeholder:
          "# We Meme....\n## We are the future.\nThis is a markdown editor.",
        info: "Type something to kick it off.",
      },

      APP_FIELD.DISCLAIMER_CHECKBOX_FIELD,
      APP_FIELD.SALT_NONCE_FIELD,
      APP_FIELD.DAO_ADDRESS_FIELD,
      APP_FIELD.SHAMAN_ADDRESS_FIELD,
      APP_FIELD.MANAGER_ACCOUNT,
      APP_FIELD.PARAM_TAG_FIELD,
      APP_FIELD.TAGS_MULTISELECT_FIELD,
    ],
  },
};

import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

export const APP_FORM: Record<string, CustomFormLego> = {
  SUMMON_MEME: {
    id: "SUMMON_MEME",
    title: "NFT Escrow Summoner",
    description:
      "Give your raid a name, description, and initial bid price. You can also add an image and a longer introduction.",
    submitButtonText: "Summon MEME",
    requiredFields: {
      daoName: true,
      tokenSymbol: true,
      description: true,
      collectorPrice: true,
      startDate: true,
      endDate: true,
      nftAddress: true,
      tokenId: true,
      minSalePrice: true,
      sellerAddress: true,
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
            label: "Raid Name",
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
            placeholder: "The token symbol for the tokenized NFT token.",
          },
        ],
      },
      {
        id: "sellerAddress",
        type: "input",
        label: "Seller Address",
        placeholder: "0x1234...5678",
      },
      {
        id: "nftAddress",
        type: "input",
        label: "NFT Address",
        placeholder: "0x1234...5678",
      },
      {
        id: "nftTokenId",
        type: "input",
        label: "Token ID",
        placeholder: "0",
      },
      {
        id: "minSalePrice",
        type: "toWeiInput",
        label: "Minimum Sale Price Threshold",
        placeholder: "69,420",
        expectType: "number",
        info: "The minimum sale price threshold (in chain native token ex. ETH). If the auction does not reach this price, the transfer can not be executed.",
      },
      {
        id: "collectorPrice",
        type: "toWeiInput",
        label: "Initial bid Price",
        placeholder: ".0069,420",
        expectType: "number",
        info: "The initial price (in chain native token ex. ETH) per 1000 nft token recieved after yeet raid.",
      },
      {
        id: "startDate",
        type: "epochDatePicker",
        label: "Start Date",
      },
      {
        id: "image",
        type: "input",
        label: "NFT Image Avatar",
        placeholder: "make sure image url is availible. IPFS gatways supported",
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
      APP_FIELD.SALT_NONCE_FIELD,
      APP_FIELD.DAO_ADDRESS_FIELD,
      APP_FIELD.SHAMAN_ADDRESS_FIELD,
      APP_FIELD.MANAGER_ACCOUNT,
      APP_FIELD.PARAM_TAG_FIELD,
      APP_FIELD.TAGS_MULTISELECT_FIELD,
    ],
  },
};

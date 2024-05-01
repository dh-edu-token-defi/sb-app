import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

// todo: support a link under description - do on page
// description font is data instead of body
// custom nft collection field
// move submitButtonText to lego level in package

export const APP_FORM: Record<string, CustomFormLego> = {
  SUMMON_MEME: {
    id: "SUMMON_MEME",
    title: "MEME Summoner",
    description:
      "Give your meme a name, description, and initial price. You can also add an image and a longer introduction.",
    submitButtonText: "Summon MEME",
    requiredFields: {
      daoName: true,
      description: true,
      collectorPrice: true
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
            label: "MEME Name",
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
            placeholder: "The token symbol for the meme token.",
          },
        ],
      },
      {
        id: "collectorPrice",
        type: "toWeiInput",
        label: "Initial Price",
        placeholder: ".0069,420",
        expectType: "number",
        info: "The initial price (in chain native token ex. ETH) per 1000 meme token.",
      },
      {
        id: "image",
        type: "input",
        label: "MEME Image Avatar",
        placeholder: "make sure image url is availible. IPFS gatways supported",
        expectType: "url",
        info: "icon, gif, pfp or avatar.",
      },
      {
        id: "article",
        type: "markdownField",
        label: "Introduction",
        placeholder: "# We Meme....\n## We are the future.\nThis is a markdown editor.",
        info: "Type something to kick it off.",
      },
      APP_FIELD.SALT_NONCE_FIELD,
      APP_FIELD.DAO_ADDRESS_FIELD,
      APP_FIELD.SHAMAN_ADDRESS_FIELD,
      APP_FIELD.MANAGER_ACCOUNT,
      APP_FIELD.PARAM_TAG_FIELD,
      APP_FIELD.TAGS_MULTISELECT_FIELD,
      {
        id: "parentCheckGateRender",
        type: "checkGateRender",
        gateLabel:
          "Is this a sub dao of another DAO? (optional)",
        clearFieldIdsOnUnchecked: [
          "parentDAOAddress"
        ],
        components: [
          
      {
        id: "parentDAOSegment",
        type: "formSegment",
        title: "Sub DAO",
        description:
          "If you are creating a sub DAO, enter the parent DAO address here.",
        fields: [
          {
            id: "parentDAOAddress",
            type: "input",
            label: "Parent DAO Address",
          }
        ],
      },
    ],
  }
]
}};

// {
//   id: "supplyAllocationSegment",
//   type: "formSegment",
//   showDivider: false,
//   fields: [
//     {
//       id: "supplyAllocation",
//       type: "splitColumn",
//       rows: [
//         {
//           rowId: "row2",
//           left: {
//             id: "lootTokenSupply",
//             type: "input",
//             label: "Meme Token Supply",
//             placeholder: "69,420,000",
//             expectType: "number",
//           },
//           right: {
//             id: "lootTokenAllocation",
//             type: "input",
//             label: "Holder Allocation %",
//             placeholder: "30",
//             expectType: "percent",
//           },
//         },
//       ],
//     },
//   ],
// },

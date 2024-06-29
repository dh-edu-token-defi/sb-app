import { CustomFieldLego } from "./fieldConfig";

export const APP_FIELD: Record<string, CustomFieldLego> = {
  MANAGER_ACCOUNT: {
    id: "managerAccountAddress",
    type: "managerAddress",
    label: "Manager Address",
    placeholder: "0x0000...0000",
    expectType: "ethAddress",
  },

  SPACER_FIELD: {
    id: "spacerField",
    type: "spacerField",
  },
  SALT_NONCE_FIELD: {
    id: "saltNonce",
    type: "saltNonce",
  },
  DAO_ADDRESS_FIELD: {
    id: "calculatedDAOAddress",
    type: "daoAddress",
  },
  SHAMAN_ADDRESS_FIELD: {
    id: "calculatedShamanAddress",
    type: "shamanAddress",
  },
  PARAM_TAG_FIELD: {
    id: "paramTag",
    type: "paramTag",
  },
  // TAGS_MULTISELECT_FIELD: {
  //   id: "tags",
  //   type: "multiSelect",
  // },
  DISCLAIMER_CHECKBOX_FIELD: {
    id: "disclaimerCheckbox",
    type: "disclaimerCheckbox",
    // label: "Disclaimer",
  },
};

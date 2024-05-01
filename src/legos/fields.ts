import { CustomFieldLego } from "./fieldConfig";

export const APP_FIELD: Record<string, CustomFieldLego> = {
  NFT_COLLECTION: {
    id: "nftContractAddress",
    type: "nftAddress",
    label: "NFT Contract Address",
    placeholder: "0x0000...0000",
    expectType: "ethAddress",
  },
  MANAGER_ACCOUNT: {
    id: "managerAccountAddress",
    type: "managerAddress",
    label: "Manager Address",
    placeholder: "0x0000...0000",
    expectType: "ethAddress",
  },
  AMOUNT_PER_NFT: {
    id: "amountPerNft",
    type: "amountPerNft",
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
  TAGS_MULTISELECT_FIELD: {
    id: 'tags',
    type: 'multiSelect',
  },
};

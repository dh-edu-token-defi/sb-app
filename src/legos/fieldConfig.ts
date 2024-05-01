import { MolochFields } from "@daohaus/moloch-v3-fields";
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { NftAddress } from "../components/customFields/NftAddress";
import { SpacerField } from "../components/customFields/SpacerField";
import { AmountPerNft } from "../components/customFields/AmountPerNft";
import { CheckGateRender } from "../components/customFields/CheckGateMeme";
import { ManagerAddress } from "../components/customFields/ManagerAddress";
import { SaltNonce } from "../components/customFields/SaltNonce";
import { DAOAddress } from "../components/customFields/DAOAddress";
import { ShamanAddress } from "../components/customFields/ShamanAddress";
import { ParamTag } from "../components/customFields/ParamTag";
import { MultiSelect } from "../components/customFields/MultiSelect";

export const AppFieldLookup = {
  ...MolochFields,
  amountPerNft: AmountPerNft,
  nftAddress: NftAddress,
  spacerField: SpacerField,
  checkGateRender: CheckGateRender,
  managerAddress: ManagerAddress,
  daoAddress: DAOAddress,
  shamanAddress: ShamanAddress,
  saltNonce: SaltNonce,
  paramTag: ParamTag,
  multiSelect: MultiSelect,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;

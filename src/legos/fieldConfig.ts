import { MolochFields } from "@daohaus/moloch-v3-fields";
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { SpacerField } from "../components/customFields/SpacerField";
import { CheckGateRender } from "../components/customFields/CheckGateMeme";
import { ManagerAddress } from "../components/customFields/ManagerAddress";
import { SaltNonce } from "../components/customFields/SaltNonce";
import { DAOAddress } from "../components/customFields/DAOAddress";
import { ShamanAddress } from "../components/customFields/ShamanAddress";
import { ParamTag } from "../components/customFields/ParamTag";
import { MDXEditorField } from "../components/customFields/MDXEditorField";
import { YeetAmount } from "../components/customFields/YeetAmount";
import { YeetReturn } from "../components/customFields/YeetReturn";
import { YeetHelper } from "../components/customFields/YeetHelper";
import { ImagePreview } from "../components/customFields/ImagePreview";
import { DisclaimerCheckbox } from "../components/customFields/DisclaimerCheckbox";
import { DateWrapper } from "../components/customFields/DateWrapper";
import { CreatedAtField } from "../components/customFields/CreatedAt";
import { YeetPerLootMod } from "../components/customFields/YeetPerLootMod";
import { LabeledToWeiInput } from "../components/customFields/LabeledToWeiInput";

export const AppFieldLookup = {
  ...MolochFields,
  spacerField: SpacerField,
  checkGateRender: CheckGateRender,
  managerAddress: ManagerAddress,
  daoAddress: DAOAddress,
  shamanAddress: ShamanAddress,
  saltNonce: SaltNonce,
  paramTag: ParamTag,
  mdxEditor: MDXEditorField,
  yeetAmount: YeetAmount,
  yeetReturn: YeetReturn,
  yeetHelper: YeetHelper,
  imagePreview: ImagePreview,
  disclaimerCheckbox: DisclaimerCheckbox,
  dateWrapper: DateWrapper,
  createdAt: CreatedAtField,
  lootPerYeetMod: YeetPerLootMod,
  labeledToWei: LabeledToWeiInput,
};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;

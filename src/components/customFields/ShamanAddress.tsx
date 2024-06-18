import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Buildable, Field } from "@daohaus/ui";

import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";
import {
  assembleMemeYeeterShamanParams,
  calculateMemeShamanAddress,
  generateShamanSaltNonce,
} from "../../utils/summonTx";

export const ShamanAddress = (props: Buildable<Field>) => {
  const { watch, setValue } = useFormContext();
  const { chainId } = useDHConnect();

  const formValues = watch();
  const saltNonce = watch("saltNonce");
  const baalAddress = watch("calculatedDAOAddress");
  const startDate = watch("startDate");

  useEffect(() => {
    // if we don't have all the values we need, return early
    // start and end date will be undefined until the form is filled out
    if (!baalAddress || !saltNonce || !startDate) return;

    const getShamanAddress = async () => {
      const {
        shamanInitParams: initializeParams,
        shamanPermission: shamanPermissions,
        shamanSingleton: shamanTemplate,
      } = assembleMemeYeeterShamanParams({
        chainId: chainId as ValidNetwork,
        formValues,
        memberAddress: "0x",
      });

      const index = "0";
      const generatedSalt = generateShamanSaltNonce({
        baalAddress,
        index,
        initializeParams,
        saltNonce,
        shamanPermissions,
        shamanTemplate,
      });

      const shamanAddress = await calculateMemeShamanAddress(
        generatedSalt,
        chainId as ValidNetwork
      );
      console.log("****setting shaman address", shamanAddress);
      setValue(props.id, shamanAddress);
    };

    if (baalAddress && saltNonce && chainId) {
      console.log(
        "****getting saltNonce to get shaman",
        baalAddress,
        saltNonce
      );
      getShamanAddress();
    }
  }, [baalAddress, saltNonce, chainId, startDate]);

  return null;
};

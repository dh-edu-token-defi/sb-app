import { ignoreEmptyVal } from "@daohaus/utils";
import { Avatar, Buildable, Field, WrappedInput } from "@daohaus/ui";
import { useFormContext, RegisterOptions } from "react-hook-form";

export const ImagePreview = (props: Buildable<Field>) => {
  const { watch } = useFormContext();
  const [image] = watch([props.id]);

  const newRules: RegisterOptions = {
    ...props.rules,
    //   setValueAs: (val: string) => (isNumberish(val) ? toBaseUnits(val) : val),
    validate: (val) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ignoreEmptyVal(val, (val: any) => {
        // check that image is a jpg, jpeg, or png
        const validImage = /\.(jpe?g|png|gif)$/i.test(val);
        if (validImage === true) {
          return true;
        } else {
          return "Must be a jpg, jpeg, gif or png image";
        }
      }),
  };

  return (
    <>
      {image && (
        <Avatar
          alt="token avatar"
          fallback="...Loading"
          size="20rem"
          src={image}
        />
      )}
      <WrappedInput {...props} rules={newRules} />
    </>
  );
};

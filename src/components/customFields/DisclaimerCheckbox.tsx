import { WrappedCheckbox, Buildable, Field } from "@daohaus/ui";

export const DisclaimerCheckbox = (props: Buildable<Field>) => {
  return (
    <WrappedCheckbox
      checkboxes={[
        {
          defaultChecked: false,
          disabled: false,
          name: "disclaimerCheckbox",
          required: true,
          title: "I understand that this is for educational purposes only",
        },
      ]}
      // label="Disclaimer"
      {...props}
    />
  );
};

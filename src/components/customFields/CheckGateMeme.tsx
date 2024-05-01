import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Buildable, CheckGate } from '@daohaus/ui';

import { FormBuilderFactory } from '@daohaus/form-builder-base';

type CheckRenderProps = Omit<
  Buildable<
    ComponentProps<typeof CheckGate> & {
      gateLabel: string;
      components: any[];
      clearFieldIdsOnUnchecked?: any[];
    }
  >,
  'fields'
>;

export const CheckGateRender = ({
  gateLabel,
  ...props
}: Buildable<CheckRenderProps>) => {
  const { setValue } = useFormContext();

  return (
    <CheckGate
      fields={props.components.map((field) => (
        <FormBuilderFactory key={field?.id} field={field} />
      ))}
      {...props}
      gateLabel={gateLabel}
      onUnchecked={() => {
        props.clearFieldIdsOnUnchecked?.forEach((field) => {
          setValue(field, null);
        });
      }}
    />
  );
};

export default CheckGateRender;
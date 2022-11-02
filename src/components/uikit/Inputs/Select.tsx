import { ViewStyle } from 'react-native';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { IconName } from '../Icon';
import { PickerModal } from '../PickerModal';
import { PickerSheet } from '../PickerSheet';
import { InputButton } from './InputButton';

type Props = {
  value?: string | string[];
  options: Array<{ label: string; value: string }>;
  label: string;
  icon?: IconName;
  message?: string;
  multiple?: boolean;
  style?: ViewStyle;
  isValid?: boolean;
  isRequired?: boolean;
  showRequiredAsterisk?: boolean;
  pickerType?: 'modal' | 'sheet';
  onChange: (option?: string | string[]) => void;
};

export const Select = forwardRef(
  (
    {
      value,
      options,
      label,
      multiple = false,
      icon = 'chevronDown',
      pickerType = 'modal',
      onChange,
      ...rest
    }: Props,
    ref: any
  ) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    const visibleValue = Array.isArray(value)
      ? options
          .filter((o) => value.includes(o.value))
          .map((o) => o.label)
          .join(', ')
      : options.find((o) => o.value === value)?.label;

    useImperativeHandle(ref, () => ({
      focus: () => {
        setPickerOpen(true);
      },
      blur: () => {
        setPickerOpen(false);
      },
    }));

    return (
      <>
        <InputButton
          {...rest}
          value={visibleValue}
          label={label}
          icon={icon}
          isFocused={isPickerOpen}
          onPress={() => setPickerOpen(true)}
        />

        {pickerType === 'modal' && (
          <PickerModal
            label={label}
            options={options}
            multiple={multiple}
            isVisible={isPickerOpen}
            selected={value}
            onConfirm={onChange}
            onClose={() => setPickerOpen(false)}
          />
        )}

        {pickerType === 'sheet' && (
          <PickerSheet
            label={label}
            emptyLabel="TODO"
            options={options}
            isVisible={isPickerOpen}
            initial={value as string} // TODO: handle multiple
            onConfirm={onChange}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </>
    );
  }
);

Select.displayName = 'Select';

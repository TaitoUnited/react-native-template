import {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { ViewStyle } from 'react-native';
import { IconName } from '../Icon/Icon';

import { PickerModal } from '../Modals/PickerModal';
import { PickerSheet } from '../Modals/PickerSheet';
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
      onChange,
      ...rest
    }: Props,
    ref: any,
  ) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    const visibleValue = Array.isArray(value)
      ? options
          .filter((o) => value.includes(o.value))
          .map((o) => o.label)
          .join(', ')
      : options.find((o) => o.value === value)?.label;

    const pickerProps: ComponentProps<typeof PickerModal> = {
      label,
      options,
      multiple,
      isVisible: isPickerOpen,
      selected: value,
      onOptionSelect: onChange,
      onClose: () => setPickerOpen(false),
    };

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

        {options.length > 20 ? (
          <PickerSheet {...pickerProps} />
        ) : (
          <PickerModal {...pickerProps} />
        )}
      </>
    );
  },
);

Select.displayName = 'Select';

import { Keyboard, ViewStyle } from 'react-native';

import {
  ComponentProps,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';

import type { IconName } from '../Icon';
import { Text } from '../Text';
import { PickerModal } from '../PickerModal';
import { PickerSheet } from '../PickerSheet';
import { InputButton } from './InputButton';
import { styled } from '~styles';

type BaseProps = {
  options: Array<{ label: string; value: string }>;
  label: string;
  icon?: IconName;
  message?: string;
  style?: ViewStyle;
  isValid?: boolean;
  isRequired?: boolean;
  showRequiredAsterisk?: boolean;
  emptyContent?: ReactNode;
  pickerType?: 'modal' | 'sheet';
};

type SingleValueProps = {
  multiple?: false;
  value: string;
  onChange: (option: string) => void;
};

type MultipleValueProps = {
  multiple: true;
  value: string[];
  onChange: (option: string[]) => void;
};

type Props = BaseProps & (SingleValueProps | MultipleValueProps);

export const Select = forwardRef(
  (
    {
      value,
      options,
      label,
      message,
      emptyContent,
      pickerType,
      multiple = false,
      icon = 'chevronDown',
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

    const pickerProps: ComponentProps<typeof PickerSheet> = {
      label,
      options,
      multiple,
      emptyContent,
      isVisible: isPickerOpen,
      selected: value as any,
      onConfirm: onChange as any,
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
          onPress={() => {
            // Dismissing the keyboard is necessary to force any focused input to blur
            Keyboard.dismiss();
            setPickerOpen(true);
          }}
        />
        {!!message && (
          <Message variant="bodySmall" color="textMuted">
            {message}
          </Message>
        )}

        {(!pickerType && options.length > 20) || pickerType === 'sheet' ? (
          <PickerSheet {...pickerProps} />
        ) : (
          <PickerModal {...pickerProps} />
        )}
      </>
    );
  }
);

Select.displayName = 'Select';

const Message = styled(Text, {
  marginTop: '$xs',
  marginLeft: '$small',
});

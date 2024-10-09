import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';
import {
  ComponentProps,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react';
import { AccessibilityProps, Keyboard, ViewStyle } from 'react-native';

import { useI18n } from '~services/i18n';

import type { IconName } from '../Icon';
import { PickerModal } from '../PickerModal';
import { PickerSheet } from '../PickerSheet';
import { InputButton } from './InputButton';

type BaseProps = {
  options: Array<{ label: string; value: string }>;
  label: string;
  labelIcon?: IconName;
  placeholder?: string;
  icon?: IconName;
  message?: string;
  style?: ViewStyle;
  isDisabled?: boolean;
  isValid?: boolean;
  isRequired?: boolean;
  showRequiredAsterisk?: boolean;
  emptyContent?: ReactNode;
  pickerType?: 'modal' | 'sheet';
};

type SingleValueProps = {
  multiple?: false;
  value: string | null;
  onChange: (option: string) => void;
};

type MultipleValueProps = {
  multiple: true;
  value: string[] | null;
  onChange: (option: string[]) => void;
};

type Props = BaseProps &
  (SingleValueProps | MultipleValueProps) &
  AccessibilityProps;

export const Select = forwardRef(
  (
    {
      value,
      options,
      label,
      labelIcon,
      placeholder = i18n._(msg`Select`),
      message,
      emptyContent,
      pickerType,
      multiple = false,
      icon = 'arrowDropDown',
      onChange,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      ...rest
    }: Props,
    ref: any
  ) => {
    const { _ } = useI18n();
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
          labelIcon={labelIcon}
          icon={icon}
          message={message}
          placeholder={placeholder}
          isFocused={isPickerOpen}
          onPress={() => {
            // Dismissing the keyboard is necessary to force any focused input to blur
            Keyboard.dismiss();
            setPickerOpen(true);
          }}
          accessibilityRole={accessibilityRole ?? 'button'}
          accessibilityLabel={ accessibilityLabel ?? _(msg`Select input for ${label}, current value: ${value}`)} // prettier-ignore
          accessibilityHint={accessibilityHint ?? _(msg`Double tap to open options to select`)} // prettier-ignore
        />

        {(!pickerType && options.length > 20) || pickerType === 'sheet' ? (
          <PickerSheet {...pickerProps} />
        ) : (
          <PickerModal {...pickerProps} />
        )}
      </>
    );
  }
);

// eslint-disable-next-line lingui/no-unlocalized-strings
Select.displayName = 'Select';

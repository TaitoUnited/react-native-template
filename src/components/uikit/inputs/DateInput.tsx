import { Keyboard, Platform, ViewStyle } from 'react-native';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { t } from '@lingui/macro';
import { DateTime } from 'luxon';
import DatePicker from 'react-native-date-picker';

import type { IconName } from '../Icon';
import { Text } from '../Text';
import { InputButton } from './InputButton';
import { styled } from '~styles';
import { useI18n } from '~services/i18n';
import { useColorMode } from '~services/color-mode';

type Props = {
  label: string;
  icon?: IconName;
  value: Date;
  message?: string;
  style?: ViewStyle;
  isValid?: boolean;
  isRequired?: boolean;
  showRequiredAsterisk?: boolean;
  mode?: 'datetime' | 'date' | 'time';
  onChange: (date: Date) => void;
};

export const DateInput = forwardRef(
  (
    {
      value,
      label,
      message,
      mode = 'date',
      icon = mode === 'time' ? 'clock' : 'calendarMonth',
      onChange,
      ...rest
    }: Props,
    ref: any
  ) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    const { locale } = useI18n();
    const { colorScheme } = useColorMode();

    useImperativeHandle(ref, () => ({
      focus: () => {
        setPickerOpen(true);
      },
      blur: () => {
        setPickerOpen(false);
      },
    }));

    const format =
      mode === 'date'
        ? DateTime.DATE_SHORT
        : mode === 'datetime'
          ? DateTime.DATETIME_SHORT
          : DateTime.TIME_SIMPLE;

    // TODO: fix Android dark mode support
    const pickerTheme = Platform.OS === 'ios' ? colorScheme : 'light';

    return (
      <>
        <InputButton
          {...rest}
          value={DateTime.fromJSDate(value).toLocaleString(format)}
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

        <DatePicker
          modal
          theme={pickerTheme}
          title={label}
          confirmText={t`Confirm`}
          cancelText={t`Cancel`}
          locale={locale}
          mode={mode}
          androidVariant="nativeAndroid"
          date={value}
          open={isPickerOpen}
          onCancel={() => setPickerOpen(false)}
          onConfirm={(date) => {
            setPickerOpen(false);
            onChange(date);
          }}
        />
      </>
    );
  }
);

DateInput.displayName = 'DateInput';

const Message = styled(Text, {
  marginTop: '$xs',
  marginLeft: '$small',
});

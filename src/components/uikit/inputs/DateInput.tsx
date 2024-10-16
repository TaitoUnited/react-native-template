import { msg } from '@lingui/macro';
import { DateTime } from 'luxon';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Keyboard, Platform, ViewStyle } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { useColorMode } from '~services/color-mode';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';

import { IconName } from '../Icon';
import { Text } from '../Text';
import { InputButton } from './InputButton';

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
    const { _ } = useI18n();
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
          confirmText={_(msg`Confirm`)}
          cancelText={_(msg`Cancel`)}
          locale={locale}
          mode={mode}
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

// eslint-disable-next-line lingui/no-unlocalized-strings
DateInput.displayName = 'DateInput';

const Message = styled(Text, {
  marginTop: '$xs',
  marginLeft: '$small',
});

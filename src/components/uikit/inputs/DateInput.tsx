import { useLingui } from '@lingui/react/macro';
import { DateTime } from 'luxon';
import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Keyboard,
  type AccessibilityProps,
  type ViewStyle,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { StyleSheet } from 'react-native-unistyles';

import { useI18n } from '~services/i18n';
import { haptics } from '~utils/haptics';

import { type IconName } from '../Icon';
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
      accessibilityLabel,
      accessibilityHint,
      ...rest
    }: Props & AccessibilityProps,
    ref: any // eslint-disable-line typescript-eslint/no-explicit-any
  ) => {
    const { t } = useLingui();
    const [isPickerOpen, setPickerOpen] = useState(false);
    const { locale } = useI18n();

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
            haptics.selection();
          }}
          accessibilityLabel={accessibilityLabel ?? t`Date picker input for ${label}, current value: ${value}`} // prettier-ignore
          accessibilityHint={accessibilityHint ?? t`Double tap to open date picker`} // prettier-ignore
        />
        {!!message && (
          <Text style={styles.message} variant="bodySmall" color="textMuted">
            {message}
          </Text>
        )}

        <DatePicker
          modal
          theme="light"
          title={label}
          confirmText={t`Confirm`}
          cancelText={t`Cancel`}
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

DateInput.displayName = 'DateInput';

const styles = StyleSheet.create((theme) => ({
  message: {
    marginTop: theme.space.xs,
    marginLeft: theme.space.small,
  },
}));

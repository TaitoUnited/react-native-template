import { useState } from 'react';
import { ViewStyle } from 'react-native';
import { DateTime } from 'luxon';
import { t } from '@lingui/macro';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { InputButton } from './InputButton';

type Props = {
  value?: Date;
  label: string;
  placeholder?: string;
  message?: string;
  style?: ViewStyle;
  isValid?: boolean;
  isRequired?: boolean;
  showRequiredAsterisk?: boolean;
  onChange: (date: Date) => void;
};

export function DateInput({ value, onChange, ...rest }: Props) {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const formattedDate = value
    ? DateTime.fromJSDate(value).toLocaleString()
    : '';

  function handleDateChange(date: Date) {
    setPickerOpen(false);
    onChange(date);
  }

  return (
    <>
      <InputButton
        {...rest}
        value={formattedDate}
        icon="calendar"
        isFocused={isPickerOpen}
        onPress={() => setPickerOpen(true)}
      />

      <DateTimePickerModal
        mode="date"
        date={value}
        isVisible={isPickerOpen}
        onConfirm={handleDateChange}
        onCancel={() => setPickerOpen(false)}
        confirmTextIOS={t`Choose`}
        cancelTextIOS={t`Close`}
      />
    </>
  );
}

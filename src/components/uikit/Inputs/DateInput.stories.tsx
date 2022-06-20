import React from 'react';
import { View } from 'react-native';
import { Stack } from '../Stack';
import { DateInput } from './DateInput';

export default {
  title: 'DateInput',
  component: DateInput,
};

export const AllStates = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  function onChange(newDate: Date) {
    setDate(newDate);
    console.log('date Changed to: ', newDate);
  }

  return (
    <View>
      <Stack axis="y" spacing="large">
        <DateInput
          value={date}
          label={'Date'}
          placeholder={'Select a date'}
          message={'Please select a date'}
          onChange={onChange}
        />
        <DateInput
          value={date}
          label={'Invalid Date'}
          placeholder={'Select a date'}
          message={'Please select a valid date'}
          isValid={false}
          onChange={onChange}
        />
        <DateInput
          value={date}
          label={'Required Date'}
          placeholder={'Select a date'}
          message={'Please select a date'}
          isRequired
          showRequiredAsterisk
          onChange={onChange}
        />
      </Stack>
    </View>
  );
};

export function DateInputWrapper() {
  return <AllStates />;
}

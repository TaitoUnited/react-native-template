import { useState, ComponentProps } from 'react';
import { Stack } from '../Stack';
import { TextInput } from './TextInput';

export function AllStates() {
  return (
    <Stack axis="y" spacing="large" style={{ maxWidth: 400 }}>
      <TextInputExample label="Default input" />

      <TextInputExample label="Required input" isRequired />

      <TextInputExample
        label="Input with info message"
        message="This is an info message"
      />

      <TextInputExample
        label="Input with placeholder and validation"
        placeholder="john@doe.com"
        isValid={false}
        message="Incorrect email address"
      />

      <TextInputExample
        label="Input with placeholder and secure text"
        placeholder="Your amazing password"
        secureTextEntry
      />
    </Stack>
  );
}

function TextInputExample(
  props: Omit<ComponentProps<typeof TextInput>, 'value' | 'onChange'>,
) {
  const [value, setValue] = useState('');

  return (
    <TextInput
      {...props}
      value={value}
      onChange={(newValue: string) => setValue(newValue)}
    />
  );
}

export function TextInputWrapper() {
  return <AllStates />;
}

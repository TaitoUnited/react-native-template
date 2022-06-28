import { useState, ComponentProps } from 'react';
import { Stack } from '../Stack/Stack';
import { StoryWrapper } from '../StoriesUtils';
import { Select } from './Select';

export function SelectWrapper() {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ];

  return (
    <StoryWrapper>
      <Stack axis="y" spacing="large" style={{ maxWidth: 400 }}>
        <TextInputExample label="Regular select" options={options} />
        <TextInputExample label="With icon" icon="filter" options={options} />
        <TextInputExample
          label="With info message"
          message="Hi, I'm a message about this select"
          options={options}
        />
        <TextInputExample
          label="Invalid select"
          isValid={false}
          message="Something wrong!"
          options={options}
        />
      </Stack>
    </StoryWrapper>
  );
}

function TextInputExample(
  props: Omit<ComponentProps<typeof Select>, 'value' | 'onChange'>,
) {
  const [value, setValue] = useState('');
  return <Select {...props} value={value} onChange={(e: any) => setValue(e)} />;
}

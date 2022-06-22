import React from 'react';
import { View } from 'react-native';
import { Stack } from '../Stack/Stack';
import { StoryWrapper } from '../StoriesUtils';
import { Checkbox } from './Checkbox';

export const AllStates = () => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Stack axis="x" spacing="small" align="center">
        <Checkbox
          value="Checkbox"
          onChange={() => setChecked(!isChecked)}
          checked={isChecked}
          label="Sluibs?"
        />
      </Stack>
    </View>
  );
};

export function CheckBoxWrapper() {
  return (
    <StoryWrapper>
      <AllStates />
    </StoryWrapper>
  );
}

import { FlatList } from 'react-native';
import { useState } from 'react';
import { t } from '@lingui/macro';
import { Icon, IconName } from './Icon';
import { Select } from '../Inputs/Select';
import { Spacer } from '../Spacer/Spacer';
import { StoryWrapper } from '../StoriesUtils';
import * as icons from '~styles/tokens/icons';
import { Color, styled } from '~styles/styled';
import { useTheme } from '~styles';

export function AllIcons() {
  return (
    <Wrapper>
      <FlatList
        data={Object.entries(icons)}
        numColumns={3}
        keyExtractor={(item) => item[1]}
        renderItem={({ item }) => (
          <StackIcon>
            <Icon name={item[0] as IconName} size={24} color="text" />
            <IconNameText>{item[0]}</IconNameText>
          </StackIcon>
        )}
      />
    </Wrapper>
  );
}

export function AllColors() {
  const theme = useTheme();

  return (
    <Wrapper>
      <FlatList
        data={Object.entries(theme.colors)}
        numColumns={3}
        keyExtractor={([key]) => key}
        renderItem={({ item }) => (
          <StackIcon>
            <Icon name="bell" size={24} color={item[0] as Color} />
            <IconNameText>{item[0]}</IconNameText>
          </StackIcon>
        )}
      />
    </Wrapper>
  );
}

type Options = {
  value: string;
  label: string;
  component?: React.FC;
}[];

export function IconWrapper() {
  const options: Options = [
    {
      value: '0',
      label: 'All Icons',
      component: AllIcons,
    },
    { value: '1', label: 'All colors', component: AllColors },
  ];

  const [state, setState] = useState(options[0].value);

  const Component = options[+state].component as React.FC;

  return (
    <StoryWrapper>
      <Select
        label={t`Select state`}
        value={state}
        onChange={(newValue) => setState(newValue as Options[0]['value'])}
        options={options}
      />
      <Spacer size="medium" />
      <Component />
    </StoryWrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const StackIcon = styled('View', {
  borderRadius: 4,
  flexCenter: 'column',
  padding: '$small',
  margin: '$small',
  width: 100,
});

const IconNameText = styled('Text', {
  textAlign: 'center',
  marginTop: '$small',
  color: '$text',
});

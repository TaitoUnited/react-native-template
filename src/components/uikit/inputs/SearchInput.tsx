import { i18n } from '@lingui/core';
import { msg, Trans } from '@lingui/macro';
import { useRef, useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';

import { styled } from '~styles';

import { Icon } from '../Icon';
import { Stack } from '../layout/Stack';
import { Text } from '../Text';

type Props = Omit<TextInputProps, 'onChange'> & {
  value: string;
  onChange: (val: string) => void;
};

export function SearchInput({
  value,
  placeholder = i18n._(msg`Search`),
  onChange,
  ...rest
}: Props) {
  const inputRef = useRef<any>();
  const [isFocused, setFocused] = useState(false);

  function handleCancel() {
    onChange('');
    inputRef.current?.blur();
  }

  return (
    <Stack axis="x" spacing="xs" align="center">
      <InputWrapper>
        <Stack axis="x" spacing="xs" align="center">
          <Icon name="search" color="neutral1" size={24} />

          <Input
            {...rest}
            {...{ ref: inputRef }} // TODO: fix stitches-native ref type issue
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            returnKeyType="done"
            selectTextOnFocus
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </Stack>
      </InputWrapper>

      {isFocused && (
        <TouchableOpacity onPress={handleCancel}>
          <Text variant="bodySmallBold" color="textMuted">
            <Trans>Cancel</Trans>
          </Text>
        </TouchableOpacity>
      )}
    </Stack>
  );
}

const InputWrapper = styled('View', {
  flex: 1,
  paddingVertical: '$xs',
  paddingHorizontal: '$small',
  borderRadius: '$full',
  backgroundColor: '$muted6',
});

const Input = styled('TextInput', {
  typography: 'bodySmall',
  color: '$text',
  flexGrow: 1,
  padding: 0,
}).attrs((p) => ({
  placeholderTextColor: p.theme.colors.neutral1,
}));

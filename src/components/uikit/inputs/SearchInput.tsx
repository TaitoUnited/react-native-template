import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInput as RNTextInput, TouchableOpacity } from 'react-native';

import { styled } from '~styles';

import { Icon } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import { TextInput, TextInputProps } from './TextInput';

type SearchInputProps = TextInputProps & {
  suggestions?: string[];
};

export const SearchInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      suggestions = [],
      placeholder = i18n._(msg`Search`),
      icon = 'search',
      value,
      onChange,
      ...rest
    }: SearchInputProps,
    ref
  ) => {
    const inputRef = useRef<RNTextInput>(null);
    useImperativeHandle(ref, () => inputRef.current as RNTextInput);

    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()) &&
        suggestion !== value
    );

    function handleSuggestionClick(option: string) {
      onChange(option);
      setShowSuggestions(false);
    }

    useEffect(() => {
      setShowSuggestions(!!value);
    }, [value]);

    return (
      <Stack axis="y" spacing="regular">
        <TextInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          icon={icon}
          {...rest}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <Suggestions axis="y" spacing="small">
            {filteredSuggestions.map((option, index) => (
              <TouchableOpacity
                onPress={() => handleSuggestionClick(option)}
                key={index}
              >
                <Stack axis="x" spacing="xs" align="end">
                  <Icon name="clock" size={16} color="textMuted" />
                  <Text variant="bodySmall" color="textMuted" key={index}>
                    {option}
                  </Text>
                </Stack>
              </TouchableOpacity>
            ))}
          </Suggestions>
        )}
      </Stack>
    );
  }
);

// eslint-disable-next-line lingui/no-unlocalized-strings
SearchInput.displayName = 'SearchInput';

const Suggestions = styled(Stack, {
  padding: '$small',
  borderRadius: '$regular',
  backgroundColor: '$surface',
  borderWidth: 0.5,
  borderColor: '$line3',
  shadow: 'medium',
});

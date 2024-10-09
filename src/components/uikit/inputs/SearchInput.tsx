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

import { useI18n } from '~services/i18n';
import { styled } from '~styles';

import { Icon } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import { TextInput, TextInputProps } from './TextInput';

type SearchInputProps = TextInputProps & {
  suggestions?: string[];
};

export const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
  (
    {
      suggestions = [],
      placeholder = i18n._(msg`Search`),
      icon = 'search',
      value,
      onChange,
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      ...rest
    }: SearchInputProps,
    ref
  ) => {
    const { _ } = useI18n();
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
          accessibilityRole={accessibilityRole ?? 'search'}
          accessibilityLabel={accessibilityLabel ?? _(msg`Search input`)}
          accessibilityHint={accessibilityHint ?? _(msg`Type to search and select from suggestions`)} // prettier-ignore
          {...rest}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <Suggestions axis="y" spacing="small" accessibilityRole="list">
            {filteredSuggestions.map((option, index) => (
              <TouchableOpacity
                onPress={() => handleSuggestionClick(option)}
                key={index}
                accessibilityLabel={option}
                accessibilityHint={_(msg`Double tap to select this suggestion`)}
              >
                <Stack axis="x" spacing="xs" align="end">
                  <Icon name="clock" size={16} color="textMuted" />
                  <Text variant="bodySmall" color="textMuted">
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

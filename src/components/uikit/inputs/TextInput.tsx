import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';
import { forwardRef, useRef, useState } from 'react';
import {
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from 'react-native';

import { styled } from '~styles';

import { Icon, IconName } from '../Icon';
import { Text } from '../Text';
import { IconButton } from '../buttons/IconButton';
import { Stack } from '../layout/Stack';

export type TextInputProps = Omit<RNTextInputProps, 'onChange'> & {
  value: string;
  onChange: (val: string) => void;
  icon?: IconName;
  isRequired?: boolean;
  isValid?: boolean;
  isDisabled?: boolean;
  showRequiredAsterisk?: boolean;
  allowSecureTextToggle?: boolean;
  label?: string;
  labelIcon?: IconName;
  message?: string;
  showCharacterLimit?: boolean;
};

export const TextInput = forwardRef(
  (
    {
      value,
      placeholder = i18n._(msg`Type here`),
      onChange,
      icon,
      isRequired = false,
      isValid = true,
      isDisabled = false,
      showRequiredAsterisk = true,
      secureTextEntry,
      allowSecureTextToggle = !!secureTextEntry,
      showCharacterLimit = false,
      maxLength = 200,
      label,
      labelIcon,
      message,
      style,
      onBlur,
      onFocus,
      multiline = false,
      returnKeyType = 'done',
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const [secureTextVisible, setSecureTextVisible] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [characterCount, setCharacterCount] = useState(value?.length || 0);
    const inputRef = useRef<any>(ref);

    function handleCancel() {
      onChange('');
      inputRef.current?.blur();
    }

    function handleFocus(e: any) {
      setFocused(true);
      if (onFocus) onFocus(e);
    }

    function handleBlur(e: any) {
      setFocused(false);
      if (onBlur) onBlur(e);
    }

    function handleChangeText(val: string) {
      if (showCharacterLimit && maxLength && val.length > maxLength) {
        val = val.substring(0, maxLength);
      }
      setCharacterCount(val.length);
      onChange(val);
    }

    return (
      <Stack axis="y" spacing="regular">
        {label && (
          <Stack axis="x" spacing="xs" align="center">
            {labelIcon && <Icon name={labelIcon} size={24} color="text" />}
            <Text variant="headingS" color="text" numberOfLines={1}>
              {label}
            </Text>
            {isRequired && showRequiredAsterisk && (
              <Text variant="body" color="error">
                *
              </Text>
            )}
          </Stack>
        )}

        {showCharacterLimit && isFocused && (
          <CharacterCount variant="bodyExtraSmall">
            <Text variant="bodyExtraSmallBold">{characterCount}</Text>
            {` / ${maxLength}`}
          </CharacterCount>
        )}

        <InputWrapper
          axis="x"
          spacing="xs"
          align="center"
          valid={isValid}
          disabled={isDisabled}
          style={style}
        >
          {!!icon && <Icon name={icon} size={24} color="text" />}

          <Input
            {...rest}
            {...{ ref: inputRef }}
            value={value}
            placeholder={placeholder}
            onChangeText={isDisabled ? undefined : handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry={allowSecureTextToggle ? !secureTextVisible : secureTextEntry} // prettier-ignore
            returnKeyType={returnKeyType}
            editable={!isDisabled}
            selectTextOnFocus={!isDisabled}
            multiline={multiline}
            maxLength={maxLength}
          />

          {allowSecureTextToggle ? (
            <InputDecoration>
              <TouchableOpacity onPress={() => setSecureTextVisible((p) => !p)}>
                {secureTextVisible ? (
                  <Icon name="eye" size={20} color="text" />
                ) : (
                  <Icon name="eyeOff" size={20} color="text" />
                )}
              </TouchableOpacity>
            </InputDecoration>
          ) : (
            <IconButton
              icon="close"
              size="small"
              onPress={handleCancel}
              disabled={!value}
            />
          )}
        </InputWrapper>

        {!!message && (
          <Stack axis="x" spacing="small" align="center">
            {!isValid && <Icon name="error" size={20} color="errorContrast" />}
            <Text
              variant="bodySmall"
              color={isValid ? 'text' : 'errorContrast'}
            >
              {message}
            </Text>
          </Stack>
        )}
      </Stack>
    );
  }
);

// eslint-disable-next-line lingui/no-unlocalized-strings
TextInput.displayName = 'TextInput';

const InputWrapper = styled(Stack, {
  padding: '$regular',
  borderRadius: '$small',
  backgroundColor: '$surface',
  borderWidth: 1,
  variants: {
    valid: {
      true: { borderColor: '$line1' },
      false: { borderColor: '$errorContrast' },
    },
    disabled: {
      true: { backgroundColor: '$neutral4', borderWidth: 0 },
    },
  },
});

const Input = styled('TextInput', {
  typography: 'body',
  color: '$text',
  lineHeight: 20,
  width: '70%', // This is to prevent the input from expanding with the text and pushing the icon out of view
  flexGrow: 1,
}).attrs((p) => ({
  placeholderTextColor: p.theme.colors.textMuted,
}));

const InputDecoration = styled('View', {
  flexCenter: 'row',
  paddingRight: '$xs',
});

const CharacterCount = styled(Text, {
  position: 'absolute',
  top: '$regular',
  right: '$xxs',
});

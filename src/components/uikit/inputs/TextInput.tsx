import { t } from '@lingui/core/macro';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  TouchableOpacity,
  type NativeSyntheticEvent,
  type TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  type TextInputFocusEventData,
} from 'react-native';

import { styled } from '~styles';
import { haptics } from '~utils/haptics';

import { Icon, type IconName } from '../Icon';
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

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      value,
      placeholder = t`Type here`,
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
      accessibilityRole,
      accessibilityLabel,
      accessibilityHint,
      ...rest
    }: TextInputProps,
    ref
  ) => {
    const [secureTextVisible, setSecureTextVisible] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [characterCount, setCharacterCount] = useState(value?.length || 0);

    const inputRef = useRef<RNTextInput>(null);
    useImperativeHandle(ref, () => inputRef.current as RNTextInput);

    function handleCancel() {
      onChange('');
      inputRef.current?.blur();
    }

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
      setFocused(true);
      haptics.selection();
      if (onFocus) onFocus(e);
    }

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
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
            <Text
              variant="headingS"
              color="text"
              numberOfLines={1}
              accessibilityLabel={t`Label for ${label} input`}
              accessibilityHint={t`Double tap to edit ${label}`}
            >
              {label}
            </Text>
            {isRequired && showRequiredAsterisk && (
              <Text
                variant="body"
                color="error"
                accessibilityLabel={t`Required field indicator`}
                accessibilityHint={t`This field is marked as required`}
              >
                *
              </Text>
            )}
          </Stack>
        )}

        {showCharacterLimit && isFocused && (
          <CharacterCount
            variant="bodyExtraSmall"
            accessibilityLabel={t`Character count`}
            accessibilityHint={t`Number of characters entered in the input field: currently ${characterCount} out of ${maxLength}`}
          >
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
        >
          {!!icon && <Icon name={icon} size={24} color="text" />}

          <Input
            {...rest}
            ref={inputRef}
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
            style={style}
            accessibilityRole={accessibilityRole ?? 'text'}
            accessibilityLabel={accessibilityLabel ?? t`${label ?? 'text'} input field`} // prettier-ignore
            accessibilityHint={accessibilityHint ?? t`Enter your ${label ?? 'text'} here`} // prettier-ignore
            accessibilityState={{ disabled: isDisabled }}
          />

          {allowSecureTextToggle ? (
            <InputDecoration>
              <TouchableOpacity
                onPress={() => setSecureTextVisible((p) => !p)}
                accessible
                accessibilityRole="button"
                accessibilityLabel={t`Toggle visibility`}
                accessibilityHint={
                  secureTextVisible
                    ? t`Hide text by toggling visibility`
                    : t`Show text by toggling visibility`
                }
              >
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
              accessibilityLabel={t`Clear input`}
              accessibilityHint={t`Double tap to clear the input`}
            />
          )}
        </InputWrapper>

        {!!message && (
          <Stack axis="x" spacing="small" align="center">
            {!isValid && <Icon name="error" size={20} color="errorContrast" />}
            <Text
              variant="bodySmall"
              color={isValid ? 'text' : 'errorContrast'}
              accessibilityHint={
                isValid
                  ? t`Informational message for the ${(label ?? '')} input field`
                  : t`This is an error message for the ${(label ?? '')} input field` // prettier-ignore
              }
            >
              {message}
            </Text>
          </Stack>
        )}
      </Stack>
    );
  }
);

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

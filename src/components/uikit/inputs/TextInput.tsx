import { forwardRef, useEffect, useState } from 'react';
import { Animated, TextInputProps, TouchableOpacity } from 'react-native';

import { styled, useTheme } from '~styles';

import { Icon } from '../Icon';
import { Text } from '../Text';
import { useInputLabelAnimation } from './common';

type Props = Omit<TextInputProps, 'onChange'> & {
  value: string;
  label: string;
  isValid?: boolean;
  isRequired?: boolean;
  message?: string;
  showRequiredAsterisk?: boolean;
  allowSecureTextToggle?: boolean;
  onChange: (val: string) => void;
  showCharacterLimit?: boolean;
};

export const TextInput = forwardRef(
  (
    {
      value,
      label,
      message,
      style,
      secureTextEntry,
      placeholder = '',
      isValid = true,
      allowSecureTextToggle = !!secureTextEntry,
      isRequired = false,
      showRequiredAsterisk = true,
      showCharacterLimit,
      onChange,
      onBlur,
      onFocus,
      multiline = false,
      maxLength,
      ...rest
    }: Props,
    ref
  ) => {
    const [secureTextVisible, setSecureTextVisible] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [characterCount, setCharacterCount] = useState(value?.length || 0);
    const { colors } = useTheme();
    const { labelStyles, labelAnimation, measureLabel, animateLabel } =
      useInputLabelAnimation({ isAnimated: Boolean(value) || isFocused });

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

    // Automatically animate the label if the value is set programatically
    useEffect(() => {
      if (
        value &&
        (!isFocused || Math.round((labelAnimation.current as any)._value) === 0)
      ) {
        animateLabel(1);
      }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <Wrapper style={style}>
        <Label style={labelStyles} pointerEvents="none">
          <Text
            variant="body"
            color={isValid ? 'text' : 'error'}
            onLayout={measureLabel}
            numberOfLines={1}
          >
            {label}
            {isRequired && showRequiredAsterisk ? '*' : ''}
          </Text>
        </Label>

        {showCharacterLimit && isFocused && (
          <CharacterCount style={labelStyles} variant="bodyExtraSmall">
            <Text variant="bodySmallBold">{characterCount}</Text>
            {` / ${maxLength}`}
          </CharacterCount>
        )}

        <InputWrapper focused={isFocused} valid={isValid}>
          <Input
            {...(rest as any)}
            ref={ref}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={isFocused ? colors.neutral3 : 'transparent'}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry={allowSecureTextToggle ? !secureTextVisible : secureTextEntry} // prettier-ignore
            multiline={multiline}
            maxLength={maxLength}
          />

          {allowSecureTextToggle && (
            <InputDecoration>
              <TouchableOpacity onPress={() => setSecureTextVisible((p) => !p)}>
                {secureTextVisible ? (
                  <Icon name="eye" size={20} color="text" />
                ) : (
                  <Icon name="eyeOff" size={20} color="text" />
                )}
              </TouchableOpacity>
            </InputDecoration>
          )}
        </InputWrapper>

        {!!message && (
          <Message variant="bodyExtraSmall" color="neutral2">
            {message}
          </Message>
        )}
      </Wrapper>
    );
  }
);

// eslint-disable-next-line lingui/no-unlocalized-strings
TextInput.displayName = 'TextInput';

const Wrapper = Animated.createAnimatedComponent(
  styled('View', {
    maxWidth: '100%',
    position: 'relative',
    display: 'flex',
    zIndex: 0,
  })
);

const Label = Animated.createAnimatedComponent(
  styled('View', {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  })
);

const InputWrapper = styled('View', {
  alignItems: 'flex-end',
  position: 'relative',
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderTopRightRadius: '$regular',
  borderTopLeftRadius: '$regular',
  variants: {
    focused: {
      true: { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
      false: { backgroundColor: 'transparent' },
    },
    valid: {
      true: { borderColor: '$text' },
      false: { borderColor: '$error' },
    },
  },
});

const Input = styled('TextInput', {
  minHeight: 60,
  typography: 'body',
  color: '$text',
  flexGrow: 1,
  paddingHorizontal: '$small',
  paddingBottom: 10,
  paddingTop: '$medium',
});

const Message = styled(Text, {
  marginTop: '$xs',
  marginLeft: '$small',
});

const InputDecoration = styled('View', {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  flexShrink: 0,
  padding: '$small',
  paddingTop: '$medium',
});

const CharacterCount = Animated.createAnimatedComponent(
  styled(Text, {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: '$small',
  })
);

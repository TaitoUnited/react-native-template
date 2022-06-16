import { forwardRef, useEffect, useState } from 'react';
import { Animated, TextInputProps, TouchableOpacity } from 'react-native';

import { Text } from '../Text';
import { Icon } from '../Icon';
import { useInputLabelAnimation } from './common';
import RequiredAsterisk from '../Buttons/RequiredAsterisk';
import { styled, useTheme } from '~styles';

type Props = Omit<TextInputProps, 'onChange'> & {
  value: string;
  label: string;
  isValid?: boolean;
  isRequired?: boolean;
  message?: string;
  showRequiredAsterisk?: boolean;
  allowSecureTextToggle?: boolean;
  onChange: (val: string) => void;
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
      isRequired = false,
      showRequiredAsterisk = true,
      allowSecureTextToggle = !!secureTextEntry,
      onChange,
      onBlur,
      onFocus,
      ...rest
    }: Props,
    ref,
  ) => {
    const [secureTextVisible, setSecureTextVisible] = useState(false);
    const [isFocused, setFocused] = useState(false);
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
          >
            {label}
            <RequiredAsterisk visible={isRequired && showRequiredAsterisk} />
          </Text>
        </Label>

        <InputWrapper focused={isFocused} valid={isValid}>
          <Input
            {...(rest as any)}
            ref={ref}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={isFocused ? colors.muted3 : 'transparent'}
            onChangeText={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            secureTextEntry={allowSecureTextToggle ? !secureTextVisible : secureTextEntry} // prettier-ignore
          />

          {allowSecureTextToggle && (
            <InputDecoration>
              <TouchableOpacity onPress={() => setSecureTextVisible((p) => !p)}>
                {secureTextVisible ? (
                  <Icon name="eyeFilled" size={20} color="text" />
                ) : (
                  <Icon name="eyeOutline" size={20} color="text" />
                )}
              </TouchableOpacity>
            </InputDecoration>
          )}
        </InputWrapper>

        {!!message && (
          <Message variant="bodySmall" color="textMuted">
            {message}
          </Message>
        )}
      </Wrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

const Wrapper = Animated.createAnimatedComponent(
  styled('View', {
    maxWidth: '100%',
    position: 'relative',
    display: 'flex',
    zIndex: 0,
  }),
);

const Label = Animated.createAnimatedComponent(
  styled('View', {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  }),
);

const InputWrapper = styled('View', {
  alignItems: 'flex-end',
  position: 'relative',
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderTopRightRadius: '$normal',
  borderTopLeftRadius: '$normal',
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
  typography: '$body',
  color: '$text',
  flexGrow: 1,
  paddingHorizontal: '$small',
  paddingBottom: 10,
  paddingTop: '$medium',
  variants: {
    multiline: {
      // HACK: for some reason `multiline` prop moves the input up a bit so we need to compensate
      true: { transform: [{ translateY: 1 }] },
      false: {},
    },
  },
});

const Message = styled(Text, {
  marginTop: '$xsmall',
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

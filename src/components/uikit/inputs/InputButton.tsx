import { ViewStyle } from 'react-native';

import { styled } from '~styles';

import { Icon, IconName } from '../Icon';
import { Text } from '../Text';
import { Stack } from '../layout/Stack';

type Props = {
  value?: string;
  label: string;
  labelIcon?: IconName;
  placeholder?: string;
  icon?: IconName;
  message?: string;
  style?: ViewStyle;
  isDisabled?: boolean;
  isValid?: boolean;
  isRequired?: boolean;
  isFocused?: boolean;
  showRequiredAsterisk?: boolean;
  onPress: () => void;
};

// A button that emulates the look-n-feel of `TextInput`
export function InputButton({
  value,
  label,
  labelIcon,
  placeholder,
  icon,
  message,
  style,
  isDisabled = false,
  isValid = true,
  isRequired = true,
  isFocused = false,
  showRequiredAsterisk = true,
  onPress,
}: Props) {
  return (
    <Stack axis="y" spacing="regular">
      <Stack axis="x" spacing="xs" align="center">
        {labelIcon && <Icon name={labelIcon} size={18} color="text" />}
        <Text variant="headingS" color="text">
          {label}
        </Text>
        {isRequired && showRequiredAsterisk && (
          <Text variant="body" color="error">
            *
          </Text>
        )}
      </Stack>
      <Wrapper style={style}>
        <InputWrapper
          focused={isFocused}
          valid={isValid}
          disabled={isDisabled}
          onPress={isDisabled ? undefined : onPress}
        >
          <Input>
            <Text
              variant="body"
              withLineHeight
              numberOfLines={1}
              style={{ flex: 1 }}
            >
              {value || placeholder}
            </Text>
          </Input>

          {!!icon && (
            <InputDecoration>
              <Icon name={icon} size={24} color="text" />
            </InputDecoration>
          )}
        </InputWrapper>
      </Wrapper>
      {!!message && (
        <Stack axis="x" spacing="small" align="center">
          {!isValid && <Icon name="error" size={20} color="errorContrast" />}
          <Text variant="bodySmall" color={isValid ? 'text' : 'errorContrast'}>
            {message}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}

const Wrapper = styled('View', {
  position: 'relative',
  display: 'flex',
});

const InputWrapper = styled('TouchableOpacity', {
  position: 'relative',
  flexDirection: 'row',
  borderWidth: 1,
  borderRadius: '$small',
  backgroundColor: '$surface',
  overflow: 'hidden',
  variants: {
    focused: {
      true: { opacity: 0.5 },
    },
    valid: {
      true: { borderColor: '$line1' },
      false: { borderColor: '$errorContrast' },
    },
    disabled: {
      true: { backgroundColor: '$neutral4', borderWidth: 0 },
    },
  },
}).attrs(({ disabled }) => ({
  activeOpacity: disabled ? 1 : 0.5,
}));

const Input = styled('View', {
  alignItems: 'flex-end',
  flexDirection: 'row',
  minHeight: 60,
  flexGrow: 1,
  paddingHorizontal: '$small',
  flexCenter: 'row',
});

const InputDecoration = styled('View', {
  flexCenter: 'row',
  paddingRight: '$xs',
});

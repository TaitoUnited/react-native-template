import { useLingui } from '@lingui/react/macro';
import { TouchableOpacity, View, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon, type IconName } from '../Icon';
import { Text } from '../Text';
import { type ButtonProps } from '../buttons/types';
import { Stack } from '../layout/Stack';

type Props = Omit<ButtonProps, 'children'> & {
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
  isRequired = false,
  isFocused = false,
  showRequiredAsterisk = true,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  ...rest
}: Props) {
  const { t } = useLingui();

  // Controls the visual styles based on the input state
  styles.useVariants({
    focused: isFocused,
    valid: isValid,
    disabled: isDisabled,
  });

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
      <View style={[styles.wrapper, style]}>
        <TouchableOpacity
          style={styles.inputWrapper}
          {...rest}
          activeOpacity={isDisabled ? 1 : 0.5}
          onPress={isDisabled ? undefined : onPress}
        >
          <Stack
            axis="x"
            spacing="regular"
            justify="around"
            align="center"
            style={styles.input}
          >
            <Text
              variant="body"
              withLineHeight
              numberOfLines={1}
              style={{ flex: 1 }}
              accessibilityLabel={accessibilityLabel ?? value}
              accessibilityHint={accessibilityHint ?? t`Double tap to enter a value`} // prettier-ignore
            >
              {value || placeholder}
            </Text>

            {!!icon && (
              <View style={styles.inputDecoration}>
                <Icon name={icon} size={24} color="text" />
              </View>
            )}
          </Stack>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: theme.radii.small,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    variants: {
      focused: {
        true: { opacity: 0.5 },
      },
      valid: {
        true: { borderColor: theme.colors.line1 },
        false: { borderColor: theme.colors.errorContrast },
      },
      disabled: {
        true: { backgroundColor: theme.colors.neutral4, borderWidth: 0 },
      },
    },
  },
  input: {
    minHeight: 60,
    flexGrow: 1,
    paddingHorizontal: theme.space.small,
  },
  inputDecoration: {
    paddingRight: theme.space.xs,
  },
}));

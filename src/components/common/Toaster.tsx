import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToastContainer, {
  type ToastConfigParams,
} from 'react-native-toast-message';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Icon, IconButton, Stack, Text } from '~components/uikit';
import { type IconName } from '~components/uikit/Icon';
import { type Color } from '~styles/styled';
import { announceForAccessibility } from '~utils/a11y';
import { haptics } from '~utils/haptics';

type Variant = 'info' | 'success' | 'warn' | 'error';

type Props = ToastConfigParams<{
  icon?: IconName;
}>;

const toastConfig = {
  success: ({ text1, text2, props }: Props) => (
    <Toast
      variant="success"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
  warn: ({ text1, text2, props }: Props) => (
    <Toast
      variant="warn"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
  error: ({ text1, text2, props }: Props) => (
    <Toast
      variant="error"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
  info: ({ text1, text2, props }: Props) => (
    <Toast
      variant="info"
      title={text1 || ''}
      subtitle={text2}
      icon={props?.icon}
    />
  ),
};

export default function Toaster() {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const topOffset = insets.top + theme.space.small;

  return <ToastContainer config={toastConfig} topOffset={topOffset} />;
}

export function showToast({
  title,
  subtitle,
  icon,
  type,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  type: Variant;
}) {
  getHaptic(type)();
  ToastContainer.show({
    text1: title,
    text2: subtitle,
    props: { icon },
    type,
  });

  announceForAccessibility({
    message: `${type} toast: ${title}${subtitle ? `, ${subtitle}` : ''}`,
  });
}

function getHaptic(type: Variant) {
  switch (type) {
    case 'info':
      return haptics.impactLight;
    case 'warn':
      return haptics.notificationWarning;
    case 'error':
      return haptics.notificationError;
    case 'success':
      return haptics.notificationSuccess;
    default:
      return haptics.impactLight;
  }
}

function Toast({
  title,
  subtitle,
  variant,
  icon,
}: {
  title: string;
  subtitle?: string;
  variant: Variant;
  icon?: IconName;
}) {
  const color = variantToColor[variant];
  const iconName = icon || variantToIcon[variant];
  const hasIcon = !!iconName;

  function onClose() {
    ToastContainer.hide();
  }

  styles.useVariants({ hasIcon });

  return (
    <View style={styles.toastWrapper}>
      <Stack axis="x" spacing="small" align="center">
        {hasIcon && <Icon name={iconName} size={24} color={color} />}

        <Stack axis="y" spacing="xxs" align="center">
          <Text variant="bodySmall" color={color}>
            {title}
          </Text>

          {!!subtitle && (
            <Text variant="bodyExtraSmall" color="textMuted">
              {subtitle}
            </Text>
          )}
        </Stack>
        <IconButton variant="plain" icon="close" onPress={onClose} />
      </Stack>
    </View>
  );
}

const variantToColor: { [variant in Variant]: Color } = {
  info: 'infoContrast',
  warn: 'warnContrast',
  error: 'errorContrast',
  success: 'successContrast',
};

const variantToIcon: { [variant in Variant]?: IconName } = {
  info: 'info',
  warn: 'warning',
  error: 'error',
  success: 'checkCircle',
};

const styles = StyleSheet.create((theme) => ({
  toastWrapper: {
    borderRadius: theme.radii.full,
    paddingVertical: theme.space.regular,
    paddingHorizontal: theme.space.medium,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.large,
    variants: {
      hasIcon: {
        true: { paddingLeft: theme.space.regular },
        false: { paddingLeft: theme.space.large },
      },
    },
  },
}));

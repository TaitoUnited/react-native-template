import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToastContainer, { ToastConfigParams } from 'react-native-toast-message';

import { Icon, IconButton, Stack, Text } from '~components/uikit';
import { IconName } from '~components/uikit/Icon';
import { Color, styled, useTheme } from '~styles/styled';

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
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const topOffset = insets.top + (theme.space.small as number);

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
  ToastContainer.show({
    text1: title,
    text2: subtitle,
    props: { icon },
    type,
  });
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

  return (
    <ToastWrapper hasIcon={hasIcon}>
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
    </ToastWrapper>
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

const ToastWrapper = styled('View', {
  borderRadius: '$full',
  paddingVertical: '$regular',
  paddingHorizontal: '$medium',
  backgroundColor: '$surface',
  shadow: 'large',
  variants: {
    hasIcon: {
      true: { paddingLeft: '$regular' },
      false: { paddingLeft: '$large' },
    },
  },
});

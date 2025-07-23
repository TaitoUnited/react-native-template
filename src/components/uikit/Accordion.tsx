import { useLingui } from '@lingui/react/macro';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible, { type CollapsibleProps } from 'react-native-collapsible';
import { StyleSheet } from 'react-native-unistyles';

import { type Color } from '~styles/styled';
import { haptics } from '~utils/haptics';

import { Icon, type IconName } from './Icon';
import { Text } from './Text';
import { Stack } from './layout/Stack';

type AccordionProps = Omit<CollapsibleProps, 'collapsed'> & {
  title: string;
  initialOpen?: boolean;
  children: React.ReactNode;
  icon?: IconName;
  iconColor?: Color;
};

export function Accordion({
  title,
  initialOpen = false,
  children,
  icon,
  iconColor,
  ...rest
}: AccordionProps) {
  const { t } = useLingui();
  const [collapsed, setCollapsed] = useState(!initialOpen);

  function onPress() {
    haptics.selection();
    setCollapsed((p) => !p);
  }

  return (
    <Stack axis="y" spacing="small">
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="header"
        accessibilityLabel={title}
        accessibilityState={{ expanded: !collapsed }}
        accessibilityHint={
          collapsed
            ? t`Double tap to expand the content`
            : t`Double tap to collapse the content`
        }
      >
        <AccordionHeader
          title={title}
          icon={icon}
          iconColor={iconColor}
          collapsed={collapsed}
        />
      </TouchableOpacity>

      <Collapsible {...rest} collapsed={collapsed}>
        {children}
      </Collapsible>
    </Stack>
  );
}

function AccordionHeader({
  title,
  icon,
  iconColor = 'neutral2',
  collapsed,
}: {
  title: string;
  icon?: IconName;
  iconColor?: Color;
  collapsed: boolean;
}) {
  return (
    <Stack
      style={styles.header}
      axis="x"
      spacing="small"
      align="center"
      justify="between"
    >
      <Text variant="headingS" numberOfLines={1} style={{ flex: 1 }}>
        {title}
      </Text>

      {icon && <Icon name={icon} color={iconColor} size={24} />}

      <Icon name={collapsed ? 'chevronDown' : 'chevronUp'} size={24} />
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.line3,
    paddingVertical: theme.space.small,
  },
}));

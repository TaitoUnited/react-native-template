import { msg } from '@lingui/macro';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible, { CollapsibleProps } from 'react-native-collapsible';

import { useI18n } from '~services/i18n';
import { Color, styled } from '~styles';

import { Icon, IconName } from './Icon';
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
  const { _ } = useI18n();
  const [collapsed, setCollapsed] = useState(!initialOpen);

  return (
    <Stack axis="y" spacing="small">
      <TouchableOpacity
        onPress={() => setCollapsed((prev) => !prev)}
        accessibilityRole="header"
        accessibilityLabel={title}
        accessibilityState={{ expanded: !collapsed }}
        accessibilityHint={
          collapsed
            ? _(msg`Double tap to expand the content`)
            : _(msg`Double tap to collapse the content`)
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

const Title = styled(Stack, {
  borderBottomWidth: 1,
  borderBottomColor: '$line3',
  paddingVertical: '$small',
});

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
    <Title axis="x" spacing="small" align="center" justify="between">
      <Text variant="headingS" numberOfLines={1} style={{ flex: 1 }}>
        {title}
      </Text>

      {icon && <Icon name={icon} color={iconColor} size={24} />}

      <Icon name={collapsed ? 'chevronDown' : 'chevronUp'} size={24} />
    </Title>
  );
}

import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible, { CollapsibleProps } from 'react-native-collapsible';

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
  const [isCollapsed, setCollapsed] = useState(!initialOpen);

  return (
    <Stack axis="y" spacing="small">
      <TouchableOpacity onPress={() => setCollapsed((p) => !p)}>
        <AccordionHeader
          title={title}
          icon={icon}
          iconColor={iconColor}
          isCollapsed={isCollapsed}
        />
      </TouchableOpacity>

      <Collapsible {...rest} collapsed={isCollapsed}>
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

export function AccordionHeader({
  title,
  icon,
  iconColor = 'neutral2',
  isCollapsed,
  standalone = false,
}: Omit<AccordionProps, 'children'> & {
  isCollapsed: boolean;
  standalone?: boolean;
}) {
  return (
    <Title axis="x" spacing="small" align="center" justify="between">
      <Text variant="headingS" numberOfLines={1} style={{ flex: 1 }}>
        {title}
      </Text>

      {icon && <Icon name={icon} color={iconColor} size={24} />}

      {!standalone && (
        <Icon name={isCollapsed ? 'chevronDown' : 'chevronUp'} size={24} />
      )}
    </Title>
  );
}

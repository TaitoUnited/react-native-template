import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { Color, styled } from '~styles';

import { Icon, IconName } from './Icon';
import { Text } from './Text';
import { Stack } from './layout/Stack';

type AccordionProps = {
  title: string;
  initialOpen?: boolean;
  children: React.ReactNode;
  icon?: IconName | null;
  iconColor?: Color | null;
};

export function Accordion({
  title,
  initialOpen = false,
  children,
  icon,
  iconColor,
}: AccordionProps) {
  const [isCollapsed, setCollapsed] = useState(!initialOpen);

  return (
    <Stack axis="y" spacing="small">
      <TouchableOpacity onPress={() => setCollapsed((p) => !p)}>
        <AccordionTitle
          title={title}
          icon={icon}
          iconColor={iconColor}
          isCollapsed={isCollapsed}
        />
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
    </Stack>
  );
}

const Title = styled(Stack, {
  borderBottomWidth: 1,
  borderBottom: '$text',
  paddingVertical: '$small',
});

export function AccordionTitle({
  title,
  icon,
  iconColor,
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

      {icon && <Icon name={icon} color={iconColor ?? 'neutral2'} size={24} />}

      {!standalone && (
        <Icon name={isCollapsed ? 'chevronDown' : 'chevronUp'} size={24} />
      )}
    </Title>
  );
}

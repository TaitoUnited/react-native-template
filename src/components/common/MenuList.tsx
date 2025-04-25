import { useLingui } from '@lingui/react/macro';
import { router } from 'expo-router';
import { isValidElement, type FunctionComponent, type ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon, Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import { haptics } from '~utils/haptics';

type Item = {
  id: string;
  label: string;
  currentValue?: string | number | ReactNode;
  checked?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  target?: FunctionComponent<any>; // | keyof ParamList;
  targetName?: string;
  onPress?: () => void;
  platform?: 'ios' | 'android';
};

type Props = {
  title?: string;
  items: Item[];
};

export default function MenuList({ items, title }: Props) {
  const { t } = useLingui();
  const filteredItems = items.filter(
    (info) => !(info.platform && Platform.OS !== info.platform)
  );

  function handleItemPress(item: Item) {
    if (typeof item.target === 'function') {
      router.navigate({
        pathname: 'menu-list/[menuListItem]',
        params: {
          menuListItem: item.targetName,
        },
      });
    } else if (typeof item.target === 'string') {
      router.navigate(item.target);
    }

    haptics.selection();
    item.onPress?.();
  }

  return (
    <Stack axis="y" spacing="xs">
      {!!title && (
        <Title variant="overlineSmall" color="textMuted">
          {title}
        </Title>
      )}

      <Wrapper>
        {filteredItems.map((item, index) => {
          const isPressable = !!item.onPress || !!item.target;
          return (
            <Pressable
              testID={item.id}
              key={item.id}
              onPress={isPressable ? () => handleItemPress(item) : undefined}
              accessibilityRole={isPressable ? 'button' : 'text'}
              accessibilityLabel={`${t`Item`} ${item.label}${item.currentValue ? `, ${t`Selected value`}: ${item.currentValue}` : ''}`} // eslint-disable-line lingui/no-unlocalized-strings
              accessibilityHint={
                isPressable ? t`Double tap to select ${item.label}` : ''
              }
            >
              <ContentWrapper axis="x" spacing="small">
                {item.leftSlot ? <LeftSlot>{item.leftSlot}</LeftSlot> : null}

                <Content
                  axis="x"
                  spacing="small"
                  align="center"
                  withDivider={index < filteredItems.length - 1}
                >
                  <Label variant="body" numberOfLines={1}>
                    {item.label}
                  </Label>

                  {item.rightSlot ? (
                    <RightSlot>{item.rightSlot}</RightSlot>
                  ) : (
                    <>
                      {item.currentValue !== undefined &&
                        (isValidElement(item.currentValue) ? (
                          item.currentValue
                        ) : (
                          <Value
                            variant="body"
                            color="textMuted"
                            numberOfLines={1}
                          >
                            {item.currentValue}
                          </Value>
                        ))}

                      {item.checked !== undefined && (
                        <>
                          {item.checked ? (
                            <CheckCircle>
                              <Icon name="check" color="infoMuted" size={14} />
                            </CheckCircle>
                          ) : (
                            <CheckOutline />
                          )}
                        </>
                      )}

                      {!!item.target && (
                        <Icon name="chevronRight" size={24} color="neutral2" />
                      )}
                    </>
                  )}
                </Content>
              </ContentWrapper>
            </Pressable>
          );
        })}
      </Wrapper>
    </Stack>
  );
}

const Wrapper = styled('View', {
  backgroundColor: '$surface',
  borderRadius: '$medium',
  overflow: 'hidden',
});

const Title = styled(Text, {
  marginLeft: '$small',
});

const Label = styled(Text, {
  flex: 1,
  paddingVertical: '$xxs',
});

const Value = styled(Text, {
  maxWidth: '75%',
});

const Pressable = styled('TouchableHighlight', {}).attrs(() => ({
  underlayColor: 'rgba(150, 150, 150, 0.2)', // TODO: Design system template do not have the pressed color for now. Might be added in the future.
}));

const ContentWrapper = styled(Stack, {
  paddingLeft: '$regular',
});

const Content = styled(Stack, {
  flex: 1,
  paddingRight: '$small',
  paddingVertical: '$small',
  variants: {
    withDivider: {
      true: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '$line3',
      },
    },
  },
});

const LeftSlot = styled('View', {
  flexCenter: 'row',
  paddingVertical: '$small',
});

const RightSlot = styled('View', {
  flexCenter: 'row',
  minHeight: 24,
});

const CheckCircle = styled('View', {
  width: 24,
  height: 24,
  borderRadius: '$full',
  backgroundColor: '$info',
  flexCenter: 'row',
});

const CheckOutline = styled('View', {
  width: 24,
  height: 24,
  borderRadius: '$full',
  borderWidth: 1,
  borderColor: '$muted4',
});

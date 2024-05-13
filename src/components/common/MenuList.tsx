import { router } from 'expo-router';
import { FunctionComponent, ReactNode, isValidElement } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon, Stack, Text } from '~components/uikit';
import { styled } from '~styles';

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
        {filteredItems.map((item, index) => (
          <Pressable
            testID={item.id}
            key={item.label}
            onPress={
              item.onPress || item.target
                ? () => handleItemPress(item)
                : undefined
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
                        <Text
                          variant="body"
                          color="textMuted"
                          numberOfLines={1}
                        >
                          {item.currentValue}
                        </Text>
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
        ))}
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

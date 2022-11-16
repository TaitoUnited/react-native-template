import { FunctionComponent, ReactNode } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { styled } from '~styles';
import { Icon, Spacer, Stack, Text } from '~components/uikit';
import { getActiveRouteName } from '~screens/utils';

type Item = {
  label: string;
  currentValue?: string | number;
  checked?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  target?: FunctionComponent<any>;
  onPress?: () => void;
};

type Props = {
  title?: string;
  items: Item[];
};

export default function MenuList({ items, title }: Props) {
  const navigation = useNavigation();

  function handleItemPress(item: Item) {
    const activeRoute = getActiveRouteName(navigation.getState());

    if (item.target) {
      if (activeRoute === 'MenuList') {
        navigation.dispatch(
          StackActions.push('MenuList', {
            target: item.target,
            title: item.label,
          })
        );
      } else {
        navigation.navigate('MenuListStack', {
          screen: 'MenuList',
          params: {
            target: item.target,
            title: item.label,
          },
        });
      }
    }

    item.onPress?.();
  }

  return (
    <Stack axis="y" spacing="xsmall">
      {!!title && (
        <Title variant="overline" color="textMuted">
          {title}
        </Title>
      )}

      <Wrapper>
        {items.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={
              item.onPress || item.target
                ? () => handleItemPress(item)
                : undefined
            }
          >
            <ContentStack axis="x" spacing="small" align="center">
              {item.leftSlot ? <LeftSlot>{item.leftSlot}</LeftSlot> : null}

              <Content withDivider={index < items.length - 1}>
                <Stack axis="x" spacing="small" align="center">
                  <Label variant="body" numberOfLines={1}>
                    {item.label}
                  </Label>

                  {item.rightSlot ? (
                    item.rightSlot
                  ) : (
                    <>
                      {item.currentValue !== undefined && (
                        <Text
                          variant="body"
                          color="textMuted"
                          numberOfLines={1}
                        >
                          {item.currentValue}
                        </Text>
                      )}

                      {item.checked !== undefined && (
                        <>
                          {item.checked ? (
                            <CheckCircle>
                              <Icon
                                name="checkmark"
                                color="infoMuted"
                                size={14}
                              />
                            </CheckCircle>
                          ) : (
                            <CheckOutline />
                          )}
                        </>
                      )}

                      {!!item.target && (
                        <>
                          <Spacer axis="x" size="xxsmall" />
                          <Icon name="chevronRight" size={24} color="muted2" />
                        </>
                      )}
                    </>
                  )}
                </Stack>
              </Content>
            </ContentStack>
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
  paddingVertical: '$normal',
});

const Pressable = styled('TouchableHighlight', {}).attrs((p) => ({
  underlayColor: p.theme.colors.pressHighlight,
}));

const ContentStack = styled(Stack, {
  paddingLeft: '$normal',
});

const Content = styled('View', {
  flex: 1,
  paddingRight: '$small',
  variants: {
    withDivider: {
      true: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '$border',
      },
    },
  },
});

const LeftSlot = styled('View', {
  flexCenter: 'row',
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

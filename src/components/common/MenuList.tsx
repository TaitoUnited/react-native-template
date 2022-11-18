import { FunctionComponent, ReactNode } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import { styled } from '~styles';
import { Icon, Spacer, Stack, Text } from '~components/uikit';
import { getActiveRouteName } from '~screens/utils';
import { ParamList } from '~screens/types';

type Item = {
  label: string;
  currentValue?: string | number;
  checked?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  target?: FunctionComponent<any> | keyof ParamList;
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

    if (typeof item.target === 'function') {
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
    } else if (typeof item.target === 'string') {
      navigation.navigate(item.target as any);
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
            <ContentWrapper axis="x" spacing="small">
              {item.leftSlot ? <LeftSlot>{item.leftSlot}</LeftSlot> : null}

              <Content
                axis="x"
                spacing="small"
                align="center"
                withDivider={index < items.length - 1}
              >
                <Label variant="body" numberOfLines={1}>
                  {item.label}
                </Label>

                {item.rightSlot ? (
                  <RightSlot>{item.rightSlot}</RightSlot>
                ) : (
                  <>
                    {item.currentValue !== undefined && (
                      <Text variant="body" color="textMuted" numberOfLines={1}>
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
});

const Pressable = styled('TouchableHighlight', {}).attrs((p) => ({
  underlayColor: p.theme.colors.pressHighlight,
}));

const ContentWrapper = styled(Stack, {
  paddingLeft: '$normal',
});

const Content = styled(Stack, {
  flex: 1,
  paddingRight: '$small',
  paddingVertical: '$small',
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

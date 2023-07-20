import { FunctionComponent, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { router } from 'expo-router';
import { styled } from '~styles';
import { Icon, Stack, Text } from '~components/uikit';

type Item = {
  label: string;
  currentValue?: string | number;
  checked?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  target?: FunctionComponent<any>; // | keyof ParamList;
  targetName?: string;
  onPress?: () => void;
};

type Props = {
  title?: string;
  items: Item[];
};

export default function MenuList({ items, title }: Props) {
  function handleItemPress(item: Item) {
    if (typeof item.target === 'function') {
      router.push({
        pathname: 'menuList/[menuListItem]',
        params: {
          menuListItem: item.targetName,
        },
      });
    } else if (typeof item.target === 'string') {
      router.push(item.target);
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
                      <Icon name="chevronRight" size={24} color="muted2" />
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
  paddingVertical: '$xxsmall',
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

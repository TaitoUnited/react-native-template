import { useLingui } from '@lingui/react/macro';
import { router, type Href } from 'expo-router';
import { isValidElement, type FunctionComponent, type ReactNode } from 'react';
import { Platform, TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon, Stack, Text } from '~components/uikit';
import { haptics } from '~utils/haptics';

export type Item = {
  id: string;
  label: string;
  currentValue?: string | number | ReactNode;
  checked?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  target?: FunctionComponent<any> | Href; // eslint-disable-line typescript-eslint/no-explicit-any
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
      router.navigate(`/menu-list/${item.targetName}`);
    } else if (typeof item.target === 'string') {
      router.navigate(item.target);
    }

    haptics.selection();
    item.onPress?.();
  }

  return (
    <Stack axis="y" spacing="xs">
      {!!title && (
        <Text style={styles.title} variant="overlineSmall" color="textMuted">
          {title}
        </Text>
      )}

      <View style={styles.wrapper}>
        {filteredItems.map((item) => {
          styles.useVariants({ withDivider: filteredItems.length > 1 });

          const isPressable = !!item.onPress || !!item.target;
          return (
            <TouchableHighlight
              testID={item.id}
              key={item.id}
              underlayColor="rgba(150, 150, 150, 0.2)" // TODO: Design system template do not have the pressed color for now. Might be added in the future.
              onPress={isPressable ? () => handleItemPress(item) : undefined}
              accessibilityRole={isPressable ? 'button' : 'text'}
              accessibilityLabel={`${t`Item`} ${item.label}${item.currentValue ? `, ${t`Selected value`}: ${item.currentValue}` : ''}`}
              accessibilityHint={
                isPressable ? t`Double tap to select ${item.label}` : ''
              }
            >
              <Stack style={styles.contentWrapper} axis="x" spacing="small">
                {item.leftSlot ? (
                  <View style={styles.leftSlot}>{item.leftSlot}</View>
                ) : null}

                <Stack
                  axis="x"
                  spacing="small"
                  align="center"
                  style={styles.content}
                >
                  <Text style={styles.label} variant="body" numberOfLines={1}>
                    {item.label}
                  </Text>

                  {item.rightSlot ? (
                    <View style={styles.rightSlot}>{item.rightSlot}</View>
                  ) : (
                    <>
                      {item.currentValue !== undefined &&
                        (isValidElement(item.currentValue) ? (
                          item.currentValue
                        ) : (
                          <Text
                            style={styles.value}
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
                            <View style={styles.checkCircle}>
                              <Icon name="check" color="infoMuted" size={14} />
                            </View>
                          ) : (
                            <View style={styles.checkOutline} />
                          )}
                        </>
                      )}

                      {!!item.target && (
                        <Icon name="chevronRight" size={24} color="neutral2" />
                      )}
                    </>
                  )}
                </Stack>
              </Stack>
            </TouchableHighlight>
          );
        })}
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.medium,
    overflow: 'hidden',
  },
  title: {
    marginLeft: theme.space.small,
  },
  label: {
    flex: 1,
    paddingVertical: theme.space.xxs,
  },
  value: {
    maxWidth: '75%',
  },
  contentWrapper: {
    paddingLeft: theme.space.regular,
  },
  content: {
    flex: 1,
    paddingRight: theme.space.small,
    paddingVertical: theme.space.small,
    variants: {
      withDivider: {
        true: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colors.line3,
        },
      },
    },
  },
  leftSlot: {
    paddingVertical: theme.space.small,
    ...theme.utils.flexCenter,
  },
  rightSlot: {
    minHeight: 24,
    ...theme.utils.flexCenter,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.info,
    ...theme.utils.flexCenter,
  },
  checkOutline: {
    width: 24,
    height: 24,
    borderRadius: theme.radii.full,
    borderWidth: 1,
    borderColor: theme.colors.neutral4,
  },
}));

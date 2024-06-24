import { Trans, msg } from '@lingui/macro';
import { setStringAsync } from 'expo-clipboard';
import { Pressable } from 'react-native';

import { showToast } from '~components/common/Toaster';
import { Note } from '~components/playground/common';
import { Grid, Icon, Stack, Text } from '~components/uikit';
import type { IconName } from '~components/uikit/Icon';
import * as icons from '~design-system/icons';
import { useI18n } from '~services/i18n';
import { styled } from '~styles';

export default function Icons() {
  const { _ } = useI18n();
  return (
    <Wrapper>
      <Stack axis="y" spacing="medium">
        <Note>
          <Trans>
            You can long press on an icon to copy its name to the clipboard.
          </Trans>
        </Note>
        <Grid spacing="small" justify="between" align="center">
          {Object.keys(icons).map((name) => (
            <Pressable
              key={name}
              onLongPress={async () => {
                await setStringAsync(name);
                showToast({
                  title: _(msg`Copied to clipboard`),
                  subtitle: `"${name}"`,
                  type: 'success',
                  icon: 'check',
                });
              }}
            >
              <IconWrapper
                axis="y"
                spacing="small"
                align="center"
                justify="center"
              >
                <Icon name={name as IconName} size={24} />
                <Text
                  variant="bodyExtraSmall"
                  color="textMuted"
                  numberOfLines={1}
                  align="center"
                >
                  {name}
                </Text>
              </IconWrapper>
            </Pressable>
          ))}
        </Grid>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  flex: 1,
}).attrs((p) => ({
  contentContainerStyle: {
    padding: p.theme.space.regular,
    paddingBottom: 100,
  },
}));

const IconWrapper = styled(Stack, {
  padding: '$xs',
  borderRadius: '$small',
  backgroundColor: '$surface',
  width: 80,
  height: 80,
});

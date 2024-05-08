import { Grid, Icon, Stack, Text } from '~components/uikit';
import type { IconName } from '~components/uikit/Icon';
import * as icons from '~design-system/icons';
import { styled } from '~styles';

export default function Icons() {
  return (
    <Wrapper>
      <Grid spacing="small" justify="center" columns={3}>
        {Object.keys(icons).map((name) => (
          <IconWrapper key={name} axis="y" spacing="small" align="center">
            <Icon name={name as IconName} size={24} />
            <Text variant="bodyExtraSmall" color="textMuted" numberOfLines={1}>
              {name}
            </Text>
          </IconWrapper>
        ))}
      </Grid>
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
});

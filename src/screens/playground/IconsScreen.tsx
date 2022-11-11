import type { ScreenProps } from '~screens/types';
import type { IconName } from '~components/uikit/Icon';
import { styled } from '~styles';
import { Icon, Grid } from '~components/uikit';
import * as icons from '~design-system/icons';

export default function IconsScreen(_: ScreenProps<'Icons'>) {
  return (
    <Wrapper>
      <Grid spacing="small" justify="center">
        {Object.keys(icons).map((name) => (
          <IconWrapper key={name}>
            <Icon name={name as IconName} size={24} />
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
    padding: p.theme.space.normal,
  },
}));

const IconWrapper = styled('View', {
  padding: '$xsmall',
  borderRadius: '$small',
  backgroundColor: '$surface',
});

import { DateTime } from 'luxon';
import { Trans } from '@lingui/macro';
import { Advertisement, DATE_FORMAT, DEADLINE_FORMAT } from '../AdvertCard';
import { CardBadge } from '../CardBadge';
import { styled } from '~styles';
import { Stack, Text } from '~components/uikit';

type Props = {
  advert: Advertisement;
};

export default function AdvertDetails({ advert }: Props) {
  const uri = `https://picsum.photos/seed/${Math.random()}/300/225`;

  // TODO: Use real date when available on the backend
  const date = DateTime.fromJSDate(advert.deadline).toLocaleString(DATE_FORMAT);
  const deadline = DateTime.fromJSDate(advert.deadline).toLocaleString(
    DEADLINE_FORMAT,
  );
  const compensation = advert.compensationCents / 100;

  return (
    <Wrapper>
      <Stack axis="y" spacing="normal">
        <Text variant="title2">{advert.name}</Text>

        <AdvertImage source={{ uri: uri }} />

        <BadgeWrapper axis="x" spacing="xxsmall">
          <CardBadge icon="pin" label={advert.location} />
          <CardBadge icon="calendar" label={date} />
          <CardBadge icon="clock" label={`Sulkeutuu ${deadline}`} />
          <CardBadge icon="piggybank" label={`${compensation}€`} />
        </BadgeWrapper>

        <Stack axis="x" spacing="small">
          <Text variant="bodyBold">
            <Trans>Production</Trans>:
          </Text>
          <Text>
            <Trans>Advertisement</Trans>
          </Text>
        </Stack>

        <Text>{advert.description}</Text>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
});

const BadgeWrapper = styled(Stack, {
  flexWrap: 'wrap',
});

const AdvertImage = styled('Image', {
  height: 150,
  width: '100%',
  borderRadius: '$medium',
});

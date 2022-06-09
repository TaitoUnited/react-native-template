import React from 'react';
import { DateTime, DateTimeFormatOptions } from 'luxon';
import { Card } from '../uikit/Card';
import { CardBadge } from './CardBadge';
import { Spacer, Stack, Text } from '~components/uikit';
import { styled } from '~styles';
import { useNavigation } from '~screens/utils';

export interface Advertisement {
  id: string;
  projectId: string;
  name: string;
  description: string;
  imageId: string;
  imageUrl: string;
  deadline: Date;
  location: string;
  compensationCents: number;
}

export const DATE_FORMAT: DateTimeFormatOptions = {
  weekday: 'short',
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
};

export const DEADLINE_FORMAT: DateTimeFormatOptions = {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
};

export default function AdvertCard({ advert }: { advert: Advertisement }) {
  const uri = `https://picsum.photos/seed/${Math.random()}/300/225`;

  // TODO: Use real date when available on the backend
  const date = DateTime.fromJSDate(advert.deadline).toLocaleString(DATE_FORMAT);
  const deadline = DateTime.fromJSDate(advert.deadline).toLocaleString(
    DEADLINE_FORMAT,
  );
  const compensation = advert.compensationCents / 100;
  const navigation = useNavigation();

  return (
    <Card onPress={() => navigation.navigate('AdvertDetails', { advert })}>
      <CardImage source={{ uri: uri }} />
      <CardContent>
        <Text variant="bodyBold">{advert.name}</Text>
        <Spacer size="small" />
        <BadgeWrapper axis="x" spacing="xxsmall">
          <CardBadge icon="pin" label={advert.location} />
          <CardBadge icon="calendar" label={date} />
          <CardBadge icon="clock" label={`Sulkeutuu ${deadline}`} />
          <CardBadge icon="piggybank" label={`${compensation}€`} />
        </BadgeWrapper>
      </CardContent>
    </Card>
  );
}

const BadgeWrapper = styled(Stack, {
  flexWrap: 'wrap',
});

const CardImage = styled('Image', {
  height: 225,
  width: '100%',
});

const CardContent = styled('View', {
  padding: '$normal',
});

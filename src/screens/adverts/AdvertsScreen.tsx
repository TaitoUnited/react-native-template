import React from 'react';
import { AdvertList } from '../../components/adverts/AdvertList';
import { styled } from '~styles';

export default function AdvertsScreen() {
  return (
    <Wrapper>
      <AdvertList />
    </Wrapper>
  );
}

const Wrapper = styled('ScrollView', {
  padding: '$medium',
  flex: 1,
});

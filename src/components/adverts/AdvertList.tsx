import React from 'react';
import { useDebouncedValue } from '../../utils/common';
import { Spacer, Stack } from '../uikit';
import AdvertCard, { Advertisement } from './AdvertCard';
import { useAdvertsFilters } from './filters.store';

export function AdvertList() {
  const searchTerm = useAdvertsFilters((state) => state.searchTerm);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 1000);
  const advertisements = generateAdvertisements();

  const filteredAdvertisements = advertisements.filter((ad) =>
    ad.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <>
      <Stack spacing="medium">
        {filteredAdvertisements.map((advert) => (
          <AdvertCard key={advert.id} advert={advert} />
        ))}
      </Stack>
      <Spacer size="xlarge" />
    </>
  );
}

function generateAdvertisements(): Advertisement[] {
  return [
    {
      id: '1',
      projectId: '1',
      name: 'Nuoripari suositun rikossarjan kuvauksiin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageId: '1',
      deadline: new Date('2021-10-11'),
      location: 'Helsinki',
      compensationCents: 50000,
      imageUrl: `https://picsum.photos/seed/1/300/225`,
    },
    {
      id: '2',
      projectId: '2',
      name: 'Raikkaaseen mainokseen noin 30v mies',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageId: '2',
      deadline: new Date('2021-10-11'),
      location: 'Pasila',
      compensationCents: 15000,
      imageUrl: `https://picsum.photos/seed/2/300/225`,
    },
    {
      id: '3',
      projectId: '3',
      name: '3kk ikäinen vauva suositun rikossarjan kuvauksiin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageId: '3',
      deadline: new Date('2021-10-11'),
      location: 'Helsinki',
      compensationCents: 20000,
      imageUrl: `https://picsum.photos/seed/3/300/225`,
    },
    {
      id: '4',
      projectId: '4',
      name: 'Noin 70v mies suositun rikossarjan kuvauksiin',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageId: '4',
      deadline: new Date('2022-10-11'),
      location: 'Espoo',
      compensationCents: 30000,
      imageUrl: `https://picsum.photos/seed/4/300/225`,
    },
  ];
}

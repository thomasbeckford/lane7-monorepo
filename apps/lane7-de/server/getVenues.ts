'use server';

import { getServerSideURL } from '@lane7/shared/utilities/getURL';

export const getVenues = async ({ countryCode }: { countryCode?: string }) => {
  const url = getServerSideURL();

  const response = await fetch(`${url}/api/venues-by-country?countryCode=${countryCode}`);
  const { venues } = await response.json();

  return venues;
};

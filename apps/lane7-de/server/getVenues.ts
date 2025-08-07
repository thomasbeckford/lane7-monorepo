'use server';

export const getVenues = async ({ countryCode }: { countryCode?: string }) => {
  console.log('GET VENUES', countryCode);

  const response = await fetch('http://localhost:3002/api/venues-by-country?countryCode=' + countryCode);
  const { venues } = await response.json();

  console.log('VENUES', venues);

  return venues;
};

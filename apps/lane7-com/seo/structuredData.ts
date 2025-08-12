export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  name: 'Lane7',
  description:
    "Lane7 is Europe's leading entertainment venue chain offering bowling, pool, and karaoke experiences with premium facilities and full bar service.",
  url: 'https://lane7.com/',
  telephone: '+44-xxx-xxx-xxxx',
  priceRange: '£8-£15',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lane7 Games & Activities',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Bowling',
        price: '£15',
        description: 'Premium bowling lanes with modern scoring systems'
      },
      {
        '@type': 'Offer',
        name: 'Pool',
        price: '£8',
        description: 'Professional pool tables in stylish setting'
      },
      {
        '@type': 'Offer',
        name: 'Karaoke',
        price: '£12',
        description: 'Private karaoke rooms with full bar service'
      }
    ]
  },
  location: [
    {
      '@type': 'Place',
      name: 'London Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'Place',
      name: 'Manchester Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manchester',
        addressCountry: 'GB'
      }
    },
    {
      '@type': 'Place',
      name: 'Berlin Lane7 Venues',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Berlin',
        addressCountry: 'DE'
      }
    },
    {
      '@type': 'Place',
      name: 'Dublin Lane7 Venue',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dublin',
        addressCountry: 'IE'
      }
    }
  ]
};

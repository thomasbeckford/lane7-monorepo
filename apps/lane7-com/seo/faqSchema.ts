// FAQ Schema
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Lane7?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lane7 is Europe's leading entertainment venue chain offering bowling, pool, and karaoke experiences across London, Manchester, Berlin, and Dublin with 8 premium locations."
      }
    },
    {
      '@type': 'Question',
      name: 'What games does Lane7 offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lane7 offers bowling from £15, pool from £8, and karaoke from £12. All venues feature premium equipment, full bar service, and modern facilities.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where are Lane7 venues located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lane7 has 8 venues across Europe: 3 in London, 2 in Manchester, 2 in Berlin, and 1 in Dublin. All locations offer bowling, pool, and karaoke facilities.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does Lane7 host corporate events?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Lane7 specializes in corporate events, team building, birthday parties, and group bookings. We accommodate parties of all sizes with dedicated event packages.'
      }
    }
  ]
};

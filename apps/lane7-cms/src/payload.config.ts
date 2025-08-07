// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
// Colecciones básicas
import { Venue } from '@lane7/shared/payload-types';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { Games } from './collections/Games';
import { Media } from './collections/Media';
import { Menus } from './collections/Menus';
import { Users } from './collections/Users';
import { Venues } from './collections/Venues';

// Globals
import { defaultLocale, locales } from '@lane7/shared/config/locales';
import { getServerSideURL } from '@lane7/shared/utilities/getURL';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Settings } from './globals/Settings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Venue> = ({ doc }) => {
  return doc?.name ? `${doc.name} | Payload Website Template` : 'Payload Website Template';
};

const generateURL: GenerateURL<Venue> = ({ doc }) => {
  const url = getServerSideURL();
  return doc?.slug ? `${url}/${doc.slug}` : url || '';
};

export default buildConfig({
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        FixedToolbarFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] })
      ];
    }
  }),
  collections: [Users, Media, Games, Venues, Menus],
  globals: [Settings],

  localization: {
    locales: locales.map(locale => locale.code),
    defaultLocale: defaultLocale,
    fallback: true
  },

  admin: {
    importMap: {
      baseDir: path.resolve(dirname)
    },
    components: {
      logout: {
        Button: './components/LogoutButton'
      }
    }
  },

  plugins: [
    vercelBlobStorage({
      collections: {
        media: true
      },
      token: process.env.BLOB_READ_WRITE_TOKEN
    }),
    seoPlugin({
      collections: ['venues'],
      uploadsCollection: 'media',
      generateTitle,
      generateDescription: ({ doc }) => doc.excerpt || `Venue ${doc.name} in Pasimedia`,
      generateURL
    })
  ],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL
    }
  }),

  typescript: {
    outputFile: path.resolve(process.cwd(), '../../packages/shared/payload-types.ts'),
    declare: false
  },

  secret: process.env.PAYLOAD_SECRET,
  // CORS - URLs que pueden acceder a tu API
  cors: [
    getServerSideURL(), // URL del CMS
    'http://localhost:3000', // lane7-com dev
    'http://localhost:3001', // lane7-de dev
    'https://lane7.com', // production
    'https://www.lane7.com',
    'https://lane7.de',
    'https://www.lane7.de'
  ],

  // CSRF - Same URLs para protección CSRF
  csrf: [
    getServerSideURL(),
    'http://localhost:3000',
    'http://localhost:3001',
    'https://lane7.com',
    'https://www.lane7.com',
    'https://lane7.de',
    'https://www.lane7.de'
  ]
});

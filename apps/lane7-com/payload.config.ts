// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
// Colecciones básicas
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { Venue } from './payload-types';
import { Games } from './payload/collections/Games';
import { Media } from './payload/collections/Media';
import { Menus } from './payload/collections/Menus';
import { Users } from './payload/collections/Users';
import { Venues } from './payload/collections/Venues';

// Globals
import { seoPlugin } from '@payloadcms/plugin-seo';
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { defaultLocale, locales } from './config/locales';
import { Settings } from './payload/globals/Settings';
import { getServerSideURL } from './utilities/getURL';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Validar variables de entorno requeridas
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

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
  sharp,

  localization: {
    locales: locales.map(locale => locale.code),
    defaultLocale: defaultLocale,
    fallback: true
  },

  admin: {
    components: {
      logout: {
        Button: './payload/components/LogoutButton'
      }
    },

    importMap: {
      baseDir: path.resolve(dirname)
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
    outputFile: path.resolve(process.cwd(), 'payload-types.ts')
  },

  secret: process.env.PAYLOAD_SECRET,
  cors: [getServerSideURL()],
  csrf: [getServerSideURL()]
});

import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '../access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated
  },
  upload: {
    // Configura dónde se guardan los archivos
    staticDir: 'public/media',
    // Limites de tamaño
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre'
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre'
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre'
      }
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf']
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
      admin: {
        description: 'Descripción de la imagen para accesibilidad'
      }
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Leyenda',
      admin: {
        description: 'Texto que aparece debajo de la imagen'
      }
    }
  ]
};

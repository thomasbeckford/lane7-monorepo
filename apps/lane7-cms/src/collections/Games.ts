import { slugField } from '@/components/fields/slugField';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate';
import type { CollectionConfig } from 'payload';
import { admin, authenticated } from '../access';

export const Games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'name' // ✅ Esto hace que use el campo 'name' como título
  },
  access: {
    create: admin,
    delete: admin,
    read: authenticated,
    update: admin
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    slugField('name', { admin: { readOnly: true } }),
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})]
      })
    },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }]
    },
    {
      name: 'howToPlay',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})]
      })
    }
  ]
};

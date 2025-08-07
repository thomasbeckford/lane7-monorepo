// collections/Venues.ts
import { SUPPORTED_COUNTRIES } from '@/config/countries';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate';
import type { CollectionConfig } from 'payload';
import { admin, authenticated } from '../access';
import { slugField } from '../fields/slugField';

export const Venues: CollectionConfig = {
  slug: 'venues',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'country', 'status']
  },
  access: {
    create: admin,
    delete: admin,
    read: authenticated,
    update: admin
  },

  fields: [
    {
      name: 'status',
      type: 'select',
      options: [
        { label: '📝 Draft', value: 'draft' },
        { label: '✅ Published', value: 'published' }
      ],
      defaultValue: 'draft'
    },
    {
      name: 'name',
      type: 'text',
      required: true
    },
    slugField('name'),

    {
      name: 'country',
      type: 'select',
      options: Object.keys(SUPPORTED_COUNTRIES).map(code => ({
        label: SUPPORTED_COUNTRIES[code].name + ' ' + SUPPORTED_COUNTRIES[code].flag,
        value: code
      }))
    },
    {
      name: 'city',
      type: 'select',
      options: [
        ...Object.entries(SUPPORTED_COUNTRIES).flatMap(
          ([countryCode, country]) =>
            country.cities?.map(city => ({
              label: `${city} (${country.name})`,
              value: `${countryCode}:${city}`
            })) || []
        )
      ],
      filterOptions: ({ options, data }) => {
        if (!data.country) return [];
        return options.filter(option => typeof option === 'object' && option.value.startsWith(`${data.country}:`));
      }
    },

    {
      name: 'locationSpecifier',
      type: 'text',
      admin: {
        description: 'Optional: Camden, The Gate, Dundrum, etc.'
      }
    },

    {
      name: 'location',
      type: 'group',
      label: 'Contact & Address',
      fields: [
        { name: 'address', type: 'textarea', required: true },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'coordinates', type: 'point' }
      ]
    },

    {
      name: 'openingHours',
      type: 'array',
      label: 'Opening Hours',
      fields: [
        { name: 'days', type: 'text' },
        { name: 'hours', type: 'text' }
      ]
    },

    {
      name: 'hero',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})]
          })
        },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' }
      ]
    },

    {
      name: 'availableGames',
      type: 'relationship',
      relationTo: 'games',
      hasMany: true
    },

    {
      name: 'foodMenu',
      type: 'relationship',
      relationTo: 'menus',
      filterOptions: {
        type: { equals: 'food' }
      }
    },
    {
      name: 'drinksMenu',
      type: 'relationship',
      relationTo: 'menus',
      filterOptions: {
        type: { equals: 'drinks' }
      }
    },

    {
      name: 'services',
      type: 'group',
      label: 'Additional Services',
      fields: [
        {
          name: 'hasGroupBookings',
          type: 'checkbox',
          label: 'Group Bookings Available',
          defaultValue: true
        },
        {
          name: 'hasGiftVouchers',
          type: 'checkbox',
          label: 'Gift Vouchers Available',
          defaultValue: true
        },
        {
          name: 'hasPartyPackages',
          type: 'checkbox',
          label: 'Party Packages Available',
          defaultValue: false
        }
      ]
    },

    {
      name: 'faqs',
      type: 'array',
      localized: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})]
          })
        }
      ],
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (typeof value === 'string' && value.includes(':')) {
              return value.split(':')[1];
            }
            return value;
          }
        ]
      }
    }
  ]
};

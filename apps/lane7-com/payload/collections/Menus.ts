import type { CollectionConfig } from 'payload';
import { admin, authenticated } from '../access';

export const Menus: CollectionConfig = {
  slug: 'menus',
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
      type: 'text'
    },
    {
      name: 'type',
      type: 'select',
      options: ['food', 'drinks']
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'number' },
        { name: 'category', type: 'text' }
      ]
    }
  ]
};

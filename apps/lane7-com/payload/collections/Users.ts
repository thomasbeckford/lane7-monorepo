import type { CollectionConfig } from 'payload';
import { admin, authenticated } from '../access';
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: admin,
    delete: admin,
    read: authenticated,
    update: admin
  },
  auth: true,
  admin: {
    useAsTitle: 'email'
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
      required: true
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Editor',
          value: 'editor'
        }
      ]
    }
  ]
};

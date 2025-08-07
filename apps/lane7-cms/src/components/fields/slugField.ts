import deepMerge from '@lane7/shared/utilities/deepMerge';
import formatSlug from '@lane7/shared/utilities/formatSlug';
import type { Field } from 'payload';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = 'name', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      type: 'text',
      index: true,
      admin: {
        components: {
          Field: './components/CustomSlugField'
        }
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)]
      }
    },
    overrides
  );

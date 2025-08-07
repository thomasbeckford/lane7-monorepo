import type { Field } from "payload";
import deepMerge from "../utilities/deepMerge";
import formatSlug from "../utilities/formatSlug";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = "name", overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: "slug",
      type: "text",
      index: true,
      admin: {
        components: {
          Field: "./payload/components/CustomSlugField",
        },
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides
  );

import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site Settings",
  fields: [
    {
      name: "siteName",
      type: "text",
      label: "Site Name",
      required: true,
    },
    {
      name: "siteDescription",
      type: "textarea",
      label: "Site Description",
    },
    {
      name: "logo",
      type: "upload",
      label: "Logo",
      relationTo: "media",
    },
    {
      name: "favicon",
      type: "upload",
      label: "Favicon",
      relationTo: "media",
    },
    {
      name: "contact",
      type: "group",
      label: "Contact Information",
      fields: [
        {
          name: "email",
          type: "email",
          label: "Email",
        },
        {
          name: "phone",
          type: "text",
          label: "Teléfono",
        },
        {
          name: "address",
          type: "textarea",
          label: "Dirección",
        },
      ],
    },
    {
      name: "social",
      type: "group",
      label: "Social Media",
      fields: [
        {
          name: "facebook",
          type: "text",
          label: "Facebook URL",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO Default",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Meta Title Default",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Meta Description Default",
        },
        {
          name: "ogImage",
          type: "upload",
          label: "OG Image Default",
          relationTo: "media",
        },
      ],
    },
  ],
};

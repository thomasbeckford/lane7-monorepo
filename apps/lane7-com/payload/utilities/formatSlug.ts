import type { FieldHook } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    // ✅ Si el slug ya existe, no lo sobrescribimos
    if (typeof value === "string" && value.trim() !== "") {
      return format(value);
    }

    // ✅ Siempre buscamos la versión en inglés
    const fallbackData = data?.[fallback] || originalDoc?.[fallback];

    if (typeof fallbackData === "string") {
      return format(fallbackData);
    }

    if (fallbackData && typeof fallbackData === "object") {
      const enValue = fallbackData["en"]; // 👈 Siempre usar "en"
      if (typeof enValue === "string") {
        return format(enValue);
      }

      const firstValue = Object.values(fallbackData)[0];
      if (typeof firstValue === "string") {
        return format(firstValue);
      }
    }

    return value;
  };

export default formatSlug;

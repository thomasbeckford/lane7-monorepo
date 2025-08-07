"use client";

import { TextInput, useField, useFormFields } from "@payloadcms/ui";
import { useEffect, useRef } from "react";

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CustomSlugField = () => {
  const { value: slugValue = "", setValue: setSlugValue } = useField<string>();
  const nameField = useFormFields(([fields]) => fields.name);
  const nameValue = (nameField?.value as string) || "";

  const prevNameRef = useRef(nameValue);
  const stopTrackingRef = useRef(false);

  useEffect(() => {
    if (stopTrackingRef.current || nameValue === prevNameRef.current) return;

    const prevSlug = formatSlug(prevNameRef.current);
    prevNameRef.current = nameValue;

    if (prevSlug !== slugValue && slugValue !== "") return;

    setSlugValue(formatSlug(nameValue));
  }, [nameValue, slugValue, setSlugValue]);

  return (
    <TextInput
      value={slugValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugValue(formatSlug(e.target.value));
        stopTrackingRef.current = true;
      }}
      path="slug"
      label="Slug"
      readOnly
    />
  );
};

export default CustomSlugField;

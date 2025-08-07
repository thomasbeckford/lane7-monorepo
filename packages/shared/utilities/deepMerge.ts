/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export default function deepMerge<
  T extends Record<string, any>,
  R extends Record<string, any>
>(target: T, source: R): T & R {
  const output = { ...target } as T & R;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!(key in target)) {
          // Si la key no existe en target, asignar directamente
          (output as any)[key] = sourceValue;
        } else if (isObject(targetValue)) {
          // Si ambos son objetos, hacer merge recursivo
          (output as any)[key] = deepMerge(targetValue, sourceValue);
        } else {
          // Si target[key] no es objeto pero source[key] sí, sobrescribir
          (output as any)[key] = sourceValue;
        }
      } else {
        // Si source[key] no es objeto, asignar directamente
        (output as any)[key] = sourceValue;
      }
    });
  }

  return output;
}

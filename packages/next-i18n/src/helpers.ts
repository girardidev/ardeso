export function getDictionaryBuilder<T extends string, U>(
  dictionaries: Record<T, () => Promise<U>>,
) {
  return (locale: T): Promise<U> => dictionaries[locale]();
}

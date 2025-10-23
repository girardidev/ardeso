import { getDictionaryBuilder } from "@repo/next-i18n/helpers";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
} as const;
export type Locales = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locales[];

export const getDictionary = getDictionaryBuilder(dictionaries);

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
export type ParamsWithLang = Promise<{
  lang: Locales;
}>;

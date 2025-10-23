import { getDictionary, type ParamsWithLang } from "@/i18n";

export default async function Dashboard({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).pages.dashboard;

  return <div>{dict.title}</div>;
}

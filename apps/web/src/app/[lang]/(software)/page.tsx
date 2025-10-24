import { getDictionary, type ParamsWithLang } from "@/i18n";
import { StreamingClient } from "./_components/streaming-client";

export default async function StreamingPage({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).software.streaming;

  return <StreamingClient dict={dict} />;
}

import type { ParamsWithLang } from "@/i18n";
import { getDictionary } from "@/i18n";
import { Navbar } from "./_components/navbar";

export default async function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} />

      <main className="flex-1">{children}</main>
    </>
  );
}

import {
  SidebarInset,
  SidebarProvider,
} from "@repo/next-ui/components/ui/sidebar";
import type { ParamsWithLang } from "@/i18n";
import { getDictionary } from "@/i18n";
import { Navbar } from "./_components/navbar";
import { AppSidebar } from "./_components/sidebar";

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
    <SidebarProvider>
      <AppSidebar lang={lang} dict={dict} />
      <SidebarInset>
        <Navbar lang={lang} dict={dict} />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

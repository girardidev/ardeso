import { getDictionary, type ParamsWithLang } from "@/i18n";
import { DashboardActions } from "./_components/dashboard-actions";
import { LoadingSection } from "./_components/loading-section";

export default async function Dashboard({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).pages.dashboard;

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-auto container mx-auto">
        <div className="p-5 space-y-5">
          <DashboardActions dict={dict.actions} />

          <div className="space-y-6">
            <LoadingSection
              title={dict.sections.folders.title}
              loadingText={dict.sections.folders.loading}
            />

            <LoadingSection
              title={dict.sections.projects.title}
              loadingText={dict.sections.projects.loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

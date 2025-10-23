import { Button } from "@repo/next-ui/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import { getDictionary, type ParamsWithLang } from "@/i18n";
import { UsersTableWithStats } from "./_components/users-table-with-stats";

export default async function UsersPage({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {dict.pages.users.title}
          </h2>
          <p className="text-muted-foreground">
            {dict.pages.users.description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {dict.pages.users.table.buttons.export}
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            {dict.pages.users.table.buttons.addUser}
          </Button>
        </div>
      </div>

      <UsersTableWithStats dict={dict} />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import Background from "@/assets/background.png";
import { getDictionary, type ParamsWithLang } from "@/i18n";
import { SignUpForm } from "./_components/form";

export default async function SignUpPage({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div
      className="min-h-svh bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              {dict.pages.auth.signUp.title}
            </CardTitle>
            <CardDescription className="text-center">
              {dict.pages.auth.signUp.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm dict={dict} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

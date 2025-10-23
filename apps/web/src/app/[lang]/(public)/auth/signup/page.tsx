import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import { getDictionary, type ParamsWithLang } from "@/i18n";
import { SignUpForm } from "./_components/sign-up-form";

export default async function SignUpPage({
  params,
}: {
  params: ParamsWithLang;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
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

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            {dict.common.legal.agreement}{" "}
            <button type="button" className="underline hover:text-primary">
              {dict.common.legal.termsOfService}
            </button>{" "}
            e{" "}
            <button type="button" className="underline hover:text-primary">
              {dict.common.legal.privacyPolicy}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

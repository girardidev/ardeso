import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import Link from "next/link";
import { getDictionary, type ParamsWithLang } from "@/i18n";
import { ForgotPasswordForm } from "./_components/form";

export default async function ForgotPasswordPage({
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
              {dict.pages.auth.forgotPassword.title}
            </CardTitle>
            <CardDescription className="text-center">
              {dict.pages.auth.forgotPassword.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm dict={dict} />
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                {dict.pages.auth.forgotPassword.form.rememberAccount}
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/${lang}/auth/signin`}
                  className="underline hover:text-primary transition-colors"
                >
                  {dict.pages.auth.forgotPassword.form.signIn}
                </Link>
                <span>{dict.pages.auth.forgotPassword.form.or}</span>
                <Link
                  href={`/${lang}/auth/signup`}
                  className="underline hover:text-primary transition-colors"
                >
                  {dict.pages.auth.forgotPassword.form.createAccount}
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

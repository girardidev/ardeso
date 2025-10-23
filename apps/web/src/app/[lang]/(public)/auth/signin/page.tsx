import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import Image from "next/image";
import Background from "@/assets/background.png";
import Logo from "@/assets/logo.png";
import { getDictionary, type ParamsWithLang } from "@/i18n";
import { SignInForm } from "./_components/form";

export default async function SignInPage({
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
      <Card className="bg-black border-none px-4 py-6 sm:px-8 sm:py-12 w-full max-w-[800px]">
        <CardHeader className="space-y-1 px-0">
          <CardTitle className="text-2xl sm:text-4xl font-bold flex items-end">
            <Image
              src={Logo}
              alt="Logo"
              width={0}
              height={0}
              className="size-8 sm:size-10"
            />
            rdeso
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 lg:gap-4 px-0">
          <div className="flex flex-col justify-between min-w-[300px] space-y-4 lg:space-y-0">
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-primary">
              {dict.pages.auth.signIn.heroTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {dict.pages.auth.signIn.heroDescription}
            </p>
          </div>
          <SignInForm dict={dict} />
        </CardContent>
      </Card>
    </div>
  );
}

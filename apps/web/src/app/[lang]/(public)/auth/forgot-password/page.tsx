import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import Link from "next/link";
import { ForgotPasswordForm } from "./_components/form";

export default function () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Esqueceu a senha?
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber instruções de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter>
            <div className="w-full flex flex-col items-center gap-2 text-sm">
              <span className="text-muted-foreground">
                Lembra da sua conta?
              </span>
              <div className="flex gap-2">
                <Link
                  href="/auth/signin"
                  className="underline hover:text-primary transition-colors"
                >
                  Entrar
                </Link>
                <span>ou então</span>
                <Link
                  href="/auth/signup"
                  className="underline hover:text-primary transition-colors"
                >
                  criar conta
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/next-ui/components/ui/card";
import Background from "@/assets/background.png";
import { SignUpForm } from "./_components/form";

export default function () {
  return (
    <div
      className="min-h-svh bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      {" "}
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Criar conta
            </CardTitle>
            <CardDescription className="text-center">
              Junte-se a nós e comece sua jornada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

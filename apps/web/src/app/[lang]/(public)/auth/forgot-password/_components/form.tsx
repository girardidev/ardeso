"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useOrpc } from "@repo/next-orpc/orpc-provider";
import { Button } from "@repo/next-ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/next-ui/components/ui/form";
import { Input } from "@repo/next-ui/components/ui/input";
import { toast } from "@repo/next-ui/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export function ForgotPasswordForm(): ReactNode {
  const orpc = useOrpc();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email("Email inválido"),
      }),
    ),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation(
    orpc.auth.forgotPassword.mutationOptions({
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error) => {
        toast.error(`${error.message}`);
        console.error("Forgot password error:", error);
      },
    }),
  );

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Email enviado!
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Verifique sua caixa de entrada e siga as instruções para redefinir
            sua senha.
          </p>
        </div>
        <Button onClick={() => router.push("/auth/signin")} className="w-full">
          Voltar ao login
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          mutate({
            email: data.email,
            redirectUri: `${window.location.origin}/pt/auth/reset-password`,
          }),
        )}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-11 text-base font-medium"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
              Enviando...
            </>
          ) : (
            "Enviar instruções"
          )}
        </Button>
      </form>
    </Form>
  );
}

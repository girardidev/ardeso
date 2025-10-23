"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { setAuthCookies } from "@repo/next-auth/actions/cookie";
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
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export function SignUpForm(): ReactNode {
  const orpc = useOrpc();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z
        .object({
          email: z.string().email("Email inválido"),
          firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
          lastName: z
            .string()
            .min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
          password: z.string().min(5, "Senha deve ter pelo menos 5 caracteres"),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "As senhas não coincidem",
          path: ["confirmPassword"],
        }),
    ),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation(
    orpc.auth.signUp.mutationOptions({
      onSuccess: async (data) => {
        await setAuthCookies(data.token, data.refreshToken, "/app");
        toast.success("Conta criada com sucesso");
        router.push("/app");
      },
      onError: (error) => {
        toast.error(`${error.message}`);
        console.error("Sign up error:", error);
      },
    }),
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            mutate({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              password: data.password,
            }),
          )}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu sobrenome"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
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
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/signin")}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Entrar
          </button>
        </p>
      </div>
    </>
  );
}

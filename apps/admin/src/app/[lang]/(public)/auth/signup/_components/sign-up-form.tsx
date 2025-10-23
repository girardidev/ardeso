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
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import z from "zod";
import type { Dictionary } from "@/i18n";

export function SignUpForm({ dict }: { dict: Dictionary }) {
  const orpc = useOrpc();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z
        .object({
          email: z.string().email(dict.pages.auth.signUp.form.email.required),
          firstName: z
            .string()
            .min(2, dict.pages.auth.signUp.form.firstName.required),
          lastName: z
            .string()
            .min(2, dict.pages.auth.signUp.form.lastName.required),
          password: z
            .string()
            .min(5, dict.pages.auth.signUp.form.password.required),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: dict.pages.auth.signUp.form.confirmPassword.required,
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

  const { mutate: googleLogin } = useMutation(
    orpc.auth.getGoogleAuthUrl.mutationOptions({
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        console.error("Google auth URL error:", error);
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
                <FormLabel>
                  {dict.pages.auth.signUp.form.firstName.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      dict.pages.auth.signUp.form.firstName.placeholder
                    }
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dict.pages.auth.signUp.form.lastName.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      dict.pages.auth.signUp.form.lastName.placeholder
                    }
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
                <FormLabel>{dict.pages.auth.signUp.form.email.label}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={dict.pages.auth.signUp.form.email.placeholder}
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
                <FormLabel>
                  {dict.pages.auth.signUp.form.password.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      dict.pages.auth.signUp.form.password.placeholder
                    }
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
                <FormLabel>
                  {dict.pages.auth.signUp.form.confirmPassword.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      dict.pages.auth.signUp.form.confirmPassword.placeholder
                    }
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
                {dict.pages.auth.signUp.form.creatingAccount}
              </>
            ) : (
              dict.pages.auth.signUp.form.createAccount
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {dict.pages.auth.signUp.form.hasAccount}{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/signin")}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {dict.pages.auth.signUp.form.signIn}
          </button>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-2 text-card-foreground">
              {dict.pages.auth.signUp.form.orContinueWith}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() =>
              googleLogin({
                redirectUri: `${window.location.origin}/pt/auth/google/callback`,
              })
            }
          >
            <FaGoogle />
            Google
          </Button>
        </div>
      </div>
    </>
  );
}

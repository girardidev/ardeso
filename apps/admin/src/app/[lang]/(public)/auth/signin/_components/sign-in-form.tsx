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
import { Label } from "@repo/next-ui/components/ui/label";
import { toast } from "@repo/next-ui/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import z from "zod";
import type { Dictionary } from "@/i18n";

export function SignInForm({ dict }: { dict: Dictionary }) {
  const orpc = useOrpc();
  const router = useRouter();

  const [isLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(dict.pages.auth.signIn.form.email.required),
        password: z
          .string()
          .min(5, dict.pages.auth.signIn.form.password.required),
      }),
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation(
    orpc.auth.signIn.mutationOptions({
      onSuccess: async (data) => {
        await setAuthCookies(data.token, data.refreshToken, "/app");
      },
      onError: (error) => {
        if (error.message === "NEXT_REDIRECT") {
          return toast.success("Login realizado com sucesso");
        }
        toast.error(`${error.message}`);
        console.log(error);
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
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email é obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.pages.auth.signIn.form.email.label}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={dict.pages.auth.signIn.form.email.placeholder}
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
                  {dict.pages.auth.signIn.form.password.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      dict.pages.auth.signIn.form.password.placeholder
                    }
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded text-primary focus:ring-primary/50"
              />
              <Label htmlFor="remember" className="text-sm">
                {dict.pages.auth.signIn.form.rememberMe}
              </Label>
            </div>
            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {dict.pages.auth.signIn.form.forgotPassword}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                {dict.pages.auth.signIn.form.signingIn}
              </>
            ) : (
              dict.pages.auth.signIn.form.signIn
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {dict.pages.auth.signIn.form.noAccount}{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/signup")}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {dict.pages.auth.signIn.form.createAccount}
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
              {dict.pages.auth.signIn.form.orContinueWith}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={() =>
              googleLogin({
                redirectUri: `${window.location.origin}/auth/google/callback`,
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

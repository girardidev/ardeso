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
import { Switch } from "@repo/next-ui/components/ui/switch";
import { toast } from "@repo/next-ui/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { ChevronRightCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
          return toast.success(dict.pages.auth.signIn.title);
        }
        toast.error(`${error.message}`);
        console.log(error);
      },
    }),
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="email"
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
              <div className="flex items-center justify-between">
                <FormLabel>
                  {dict.pages.auth.signIn.form.password.label}
                </FormLabel>

                <button
                  type="button"
                  onClick={() => router.push("/auth/forgot-password")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {dict.pages.auth.signIn.form.forgotPassword}
                </button>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder={dict.pages.auth.signIn.form.password.placeholder}
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
            <div className="flex w-full justify-between">
              <div className="flex items-center space-x-2">
                <Switch name="remember" />
                <Label htmlFor="remember" className="text-sm">
                  {dict.pages.auth.signIn.form.rememberMe}
                </Label>
              </div>

              {/* <Link href="/auth/signup">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm w-full sm:w-auto"
                >
                  Create account
                </Button>
              </Link> */}
            </div>

            <Button
              type="submit"
              className="text-sm font-medium w-full sm:w-auto"
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                  {dict.pages.auth.signIn.form.signingIn}
                </>
              ) : (
                dict.pages.auth.signIn.form.signIn
              )}
              <ChevronRightCircleIcon />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import type { Dictionary } from "@/i18n";

export function ForgotPasswordForm({ dict }: { dict: Dictionary }) {
  const orpc = useOrpc();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email(dict.pages.auth.forgotPassword.form.email.required),
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
            {dict.pages.auth.forgotPassword.success.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {dict.pages.auth.forgotPassword.success.description}
          </p>
        </div>
        <Button onClick={() => router.push("/auth/signin")} className="w-full">
          {dict.pages.auth.forgotPassword.success.backToLogin}
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
              <FormLabel>
                {dict.pages.auth.forgotPassword.form.email.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={
                    dict.pages.auth.forgotPassword.form.email.placeholder
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
              {dict.pages.auth.forgotPassword.form.sending}
            </>
          ) : (
            dict.pages.auth.forgotPassword.form.sendInstructions
          )}
        </Button>
      </form>
    </Form>
  );
}

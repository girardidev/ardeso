"use client";

import { setAuthCookies } from "@repo/next-auth/actions/cookie";
import { useOrpc } from "@repo/next-orpc/orpc-provider";
import { toast } from "@repo/next-ui/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const orpc = useOrpc();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const { mutate } = useMutation(
    orpc.auth.signInWithGoogleAuth.mutationOptions({
      onSuccess: async (data) => {
        await setAuthCookies(data.token, data.refreshToken, "/app");
        toast.success("Login com Google realizado com sucesso");
        router.push("/app");
      },
      onError: (error) => {
        toast.error("Falha na autenticação com Google");
        console.error("Google sign in error:", error);
        router.push("/auth/signin?error=google-auth-failed");
      },
    }),
  );

  useEffect(() => {
    if (code) {
      mutate({
        code,
        redirectUri: `${window.location.origin}/auth/google/callback`,
      });
    } else {
      router.push("/auth/signin?error=no-code");
    }
  }, [code, mutate, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-muted-foreground">Autenticando com Google...</p>
      </div>
    </div>
  );
}

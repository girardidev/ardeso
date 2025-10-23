"use client";

import { Loader2 } from "lucide-react";

interface LoadingSectionProps {
  title: string;
  loadingText: string;
}

export function LoadingSection({ title, loadingText }: LoadingSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="flex items-center justify-center h-[180px] rounded-lg bg-muted/40 border border-border/50">
        <div className="flex flex-col items-center gap-2.5">
          <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{loadingText}</p>
        </div>
      </div>
    </section>
  );
}

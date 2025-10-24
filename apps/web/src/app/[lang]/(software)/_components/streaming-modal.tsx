"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/next-ui/components/ui/alert-dialog";
import { Button } from "@repo/next-ui/components/ui/button";
import { Input } from "@repo/next-ui/components/ui/input";
import { Label } from "@repo/next-ui/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import type { Dictionary } from "@/i18n";

interface StreamingModalProps {
  dict: Dictionary["software"]["streaming"];
  onSubmit: (userName: string) => void;
}

export function StreamingModal({ dict, onSubmit }: StreamingModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const inputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowModal(false);
      onSubmit(userName.trim());
    }
  };

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Button variant="outline" size="icon" asChild>
            <Link href="/app">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <AlertDialogTitle>{dict.welcomeTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {dict.welcomeDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor={inputId}>{dict.nameLabel}</Label>
              <Input
                id={inputId}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={dict.namePlaceholder}
                autoFocus
              />
            </div>
          </div>
          <AlertDialogFooter>
            <Button type="submit" disabled={!userName.trim()}>
              {dict.enterButton}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

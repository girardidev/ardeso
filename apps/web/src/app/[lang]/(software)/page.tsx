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
import Background from "@/assets/background.png";
import { PixelStreamingWrapper } from "./_components/pixelstreaming";

export default function StreamingPage() {
  const [isReady, setIsReady] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [userName, setUserName] = useState("");
  const inputId = useId();

  // const { data: _ } = useQuery(
  //   orpc.software.queue.queryOptions({ enabled: isReady }),
  // );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowModal(false);
      setIsReady(true);
    }
  };

  // useEffect(() => {
  //   const url = `${process.env.NEXT_PUBLIC_API_URL}/sse`;
  //   const eventSource = new EventSource(url);

  //   eventSource.addEventListener("time-update", (event) => {
  //     console.log(event.data);
  //   });
  //   eventSource.onerror = (event) => {
  //     console.log(event);
  //   };
  //   eventSource.onopen = () => {
  //     console.log("Connected to SSE");
  //   };
  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  return (
    <>
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Button variant="outline" size="icon" asChild>
              <Link href="/app">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <AlertDialogTitle>Welcome to the Streaming</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your name to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor={inputId}>Name</Label>
                <Input
                  id={inputId}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  autoFocus
                />
              </div>
            </div>
            <AlertDialogFooter>
              <Button type="submit" disabled={!userName.trim()}>
                Entrar
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <div
        className="min-h-svh bg-cover bg-center bg-no-repeat flex"
        style={{ backgroundImage: `url(${Background.src})` }}
      >
        {isReady && (
          <PixelStreamingWrapper
            initialSettings={{
              ss: "wss://wilbur.software.ardeso.com",
              AutoPlayVideo: true,
              AutoConnect: true,
              StartVideoMuted: true,
              HoveringMouse: true,
              WaitForStreamer: true,
              MaxReconnectAttempts: 9999,
              StreamerAutoJoinInterval: 1000,
              MatchViewportRes: true,
            }}
          />
        )}
      </div>
    </>
  );
}

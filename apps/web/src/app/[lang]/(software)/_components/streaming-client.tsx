"use client";

import { useState } from "react";
import Background from "@/assets/background.png";
import type { Dictionary } from "@/i18n";
import { PixelStreamingWrapper } from "./pixelstreaming";
import { StreamingModal } from "./streaming-modal";

interface StreamingClientProps {
  dict: Dictionary["software"]["streaming"];
}

export function StreamingClient({ dict }: StreamingClientProps) {
  const [isReady, setIsReady] = useState(true);

  const handleUserSubmit = (userName: string) => {
    console.log("User submitted name:", userName);
    setIsReady(true);
  };

  return (
    <>
      <StreamingModal dict={dict} onSubmit={handleUserSubmit} />

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
            dict={dict.floatingMenu}
          />
        )}
      </div>
    </>
  );
}

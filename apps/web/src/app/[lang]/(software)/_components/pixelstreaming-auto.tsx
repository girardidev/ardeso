"use client";

import {
  type AllSettings,
  Config,
  PixelStreaming,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6";

import { useEffect, useRef, useState } from "react";

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
}

export const PixelStreamingWrapperAuto = ({
  initialSettings,
}: PixelStreamingWrapperProps) => {
  const videoParent = useRef<HTMLDivElement>(null);

  const [_, setPixelStreaming] = useState<PixelStreaming>();

  useEffect(() => {
    if (videoParent.current) {
      const config = new Config({ initialSettings });
      const streaming = new PixelStreaming(config, {
        videoElementParent: videoParent.current,
      });

      // registerEvents(streaming, setStatus, setLatency);
      setPixelStreaming(streaming);

      return () => {
        try {
          streaming.disconnect();
        } catch {}
      };
    }
  }, [initialSettings]);

  return (
    <div className="relative flex-1">
      <div className="absolute top-0 left-0 w-full h-full" ref={videoParent} />
    </div>
  );
};

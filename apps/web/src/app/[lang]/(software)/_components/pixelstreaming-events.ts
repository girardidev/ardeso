import type {
  LatencyCalculatedEvent,
  PixelStreaming,
  PixelStreamingEvent,
  StreamerListMessageEvent,
} from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6";

let acquireRequested = false;

export type StreamingStatus =
  | "disconnected"
  | "connecting-wilbur"
  | "connected-wilbur"
  | "connecting-webrtc"
  | "connected-webrtc"
  | "reconnecting"
  | "failed"
  | "loading";

type PSEventType = PixelStreamingEvent["type"];
type EventCallback = (
  event: PixelStreamingEvent,
  pixelStreaming: PixelStreaming,
  updateStatus: (status: StreamingStatus) => void,
  updateLatency: (latency: number) => void,
) => void;

function logEvent(event: PixelStreamingEvent, callback: () => void) {
  console.warn(event.type);
  return callback();
}

export const createPSEvents = (
  updateStatus: (status: StreamingStatus) => void,
  updateLatency: (latency: number) => void,
): Record<PSEventType, EventCallback> => ({
  streamConnect: (event) =>
    logEvent(event, () => {
      updateStatus("connected-wilbur");
    }),
  streamDisconnect: (event) =>
    logEvent(event, () => {
      updateStatus("disconnected");
    }),
  playStreamRejected: (event) =>
    logEvent(event, () => {
      updateStatus("failed");
    }),
  afkWarningActivate: (event) => logEvent(event, () => {}),
  afkWarningUpdate: (event) => logEvent(event, () => {}),
  afkWarningDeactivate: (event) => logEvent(event, () => {}),
  afkTimedOut: (event) =>
    logEvent(event, () => {
      updateStatus("disconnected");
    }),
  videoEncoderAvgQP: (event) => logEvent(event, () => {}),
  webRtcSdp: (event) => logEvent(event, () => {}),
  webRtcSdpOffer: (event) => logEvent(event, () => {}),
  webRtcSdpAnswer: (event) => logEvent(event, () => {}),
  webRtcAutoConnect: (event) =>
    logEvent(event, () => {
      updateStatus("connecting-webrtc");
    }),
  webRtcConnecting: (event) =>
    logEvent(event, () => {
      console.warn(event);
      updateStatus("connecting-webrtc");
    }),
  webRtcConnected: (event) =>
    logEvent(event, () => {
      updateStatus("connected-webrtc");
      console.warn(event);
    }),
  webRtcFailed: (event) =>
    logEvent(event, () => {
      updateStatus("failed");
    }),
  webRtcDisconnected: (event) =>
    logEvent(event, () => {
      updateStatus("disconnected");
    }),
  dataChannelOpen: (event) => logEvent(event, () => {}),
  dataChannelClose: (event) => logEvent(event, () => {}),
  dataChannelError: (event) =>
    logEvent(event, () => {
      updateStatus("failed");
    }),
  videoInitialized: (event) => logEvent(event, () => {}),
  showOnScreenKeyboard: (event) => logEvent(event, () => {}),
  streamLoading: (event) =>
    logEvent(event, () => {
      updateStatus("loading");
    }),
  streamReconnect: (event) =>
    logEvent(event, () => {
      updateStatus("reconnecting");
    }),
  playStreamError: (event) =>
    logEvent(event, () => {
      updateStatus("failed");
    }),
  playStream: (event) =>
    logEvent(event, () => {
      updateStatus("connected-webrtc");
    }),
  loadFreezeFrame: (event) => logEvent(event, () => {}),
  hideFreezeFrame: (event) => logEvent(event, () => {}),
  statsReceived: (event) => logEvent(event, () => {}),
  streamerListMessage: (event) =>
    logEvent(event, () => {
      const e = event as StreamerListMessageEvent;
      const list = e.data.messageStreamerList.ids;
      // If empty list, trigger backend acquire only once
      if ((!list || list.length === 0) && !acquireRequested) {
        acquireRequested = true;
        updateStatus("loading");
        return;
      }
      updateStatus("connected-wilbur");
      console.warn(list);
    }),
  streamerIDChangedMessage: (event) => logEvent(event, () => {}),
  latencyCalculated: (event) =>
    logEvent(event, () => {
      const latencyEvent = event as LatencyCalculatedEvent;
      const latency = latencyEvent.data.latencyInfo.averageProcessingDelayMs;
      if (typeof latency === "number") {
        updateLatency(latency);
      }
    }),
  latencyTestResult: (event) => logEvent(event, () => {}),
  dataChannelLatencyTestResponse: (event) => logEvent(event, () => {}),
  dataChannelLatencyTestResult: (event) => logEvent(event, () => {}),
  subscribeFailed: (event) =>
    logEvent(event, () => {
      updateStatus("failed");
    }),
  initialSettings: (event) => logEvent(event, () => {}),
  settingsChanged: (event) => logEvent(event, () => {}),
  xrSessionStarted: (event) => logEvent(event, () => {}),
  xrSessionEnded: (event) => logEvent(event, () => {}),
  xrFrame: (event) => logEvent(event, () => {}),
  playerCount: (event) => logEvent(event, () => {}),
  webRtcTCPRelayDetected: (event) => logEvent(event, () => {}),
});

export const registerEvents = (
  pixelStreaming: PixelStreaming,
  updateStatus: (status: StreamingStatus) => void,
  updateLatency: (latency: number) => void,
) => {
  const PSEvents = createPSEvents(updateStatus, updateLatency);

  Object.entries(PSEvents).forEach(([key, callback]) => {
    pixelStreaming.addEventListener(key as PSEventType, (e) =>
      callback(e, pixelStreaming, updateStatus, updateLatency),
    );
  });
};

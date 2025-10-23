import { lazy } from "@orpc/server";
import { base } from "@/orpc/context";

export default base.prefix("/storage").router({
  storageDelete: lazy(() => import("./storage-delete.route")),
  storageGetDownloadUrl: lazy(() => import("./storage-get-download-url.route")),
  storageGetUploadUrl: lazy(() => import("./storage-get-upload-url.route")),
});

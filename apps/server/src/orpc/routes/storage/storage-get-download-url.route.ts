import { ORPCError } from "@orpc/server";
import z from "zod";
import { base } from "@/orpc/context";
import { requireAuth } from "@/orpc/middlewares";

export default base
  .route({ method: "GET", path: "/{fileId}/download-url" })
  .input(
    z.object({
      fileId: z.uuid(),
    }),
  )
  .output(
    z.object({
      downloadUrl: z.string(),
    }),
  )
  .use(requireAuth)
  .handler(async ({ input: { fileId }, context: { userId, di } }) => {
    const storageService = di.getStorageService();

    try {
      const downloadUrl = await storageService.getDownloadSignedUrl(
        fileId,
        userId,
      );
      return { downloadUrl };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate download URL";

      if (message.includes("not found")) {
        throw new ORPCError("NOT_FOUND", { message });
      }

      if (message.includes("Unauthorized")) {
        throw new ORPCError("UNAUTHORIZED", { message });
      }

      throw new ORPCError("BAD_REQUEST", { message });
    }
  });

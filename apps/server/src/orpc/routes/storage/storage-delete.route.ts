import { ORPCError } from "@orpc/server";
import z from "zod";
import { base } from "@/orpc/context";
import { requireAuth } from "@/orpc/middlewares";

export default base
  .route({ method: "DELETE", path: "/{fileId}" })
  .input(
    z.object({
      fileId: z.uuid(),
    }),
  )
  .output(
    z.object({
      success: z.boolean(),
    }),
  )
  .use(requireAuth)
  .handler(async ({ input: { fileId }, context: { userId, di } }) => {
    const storageService = di.getStorageService();

    try {
      const success = await storageService.deleteFile(fileId, userId);
      return { success };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete file";

      if (message.includes("not found")) {
        throw new ORPCError("NOT_FOUND", { message });
      }

      if (message.includes("Unauthorized")) {
        throw new ORPCError("UNAUTHORIZED", { message });
      }

      throw new ORPCError("BAD_REQUEST", { message });
    }
  });

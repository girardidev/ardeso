import { ORPCError } from "@orpc/server";
import z from "zod";
import { base } from "@/orpc/context";
import { requireAuth } from "@/orpc/middlewares";

export default base
  .route({ method: "POST", path: "/upload-url" })
  .input(
    z.object({
      filename: z.string().min(1),
      mimetype: z.string().min(1),
      size: z.number().int().positive(),
    }),
  )
  .output(
    z.object({
      uploadUrl: z.string(),
      fileId: z.string(),
      key: z.string(),
    }),
  )
  .use(requireAuth)
  .handler(
    async ({
      context: { userId, di },
      input: { filename, mimetype, size },
    }) => {
      const storageService = di.getStorageService();

      try {
        return await storageService.getUploadSignedUrl(
          userId,
          filename,
          mimetype,
          size,
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Failed to generate upload URL";
        throw new ORPCError("BAD_REQUEST", { message });
      }
    },
  );

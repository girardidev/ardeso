import { ORPCError } from "@orpc/server";
import z from "zod";
import { tokensSchema } from "@/core/entities/tokens.entity";
import { base } from "@/orpc/context";

export default base
  .route({ method: "POST", path: "/signup" })
  .input(
    z.object({
      email: z.email(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string().min(5),
      avatar: z.string().optional(),
    }),
  )
  .output(tokensSchema)
  .handler(
    async ({
      input: { email, firstName, lastName, avatar, password },
      context: { di },
    }) => {
      const authService = di.getAuthService();

      return await authService
        .signUp({
          email,
          firstName,
          lastName,
          avatar,
          password,
          fullName: `${firstName} ${lastName}`,
        })
        .catch((error) => {
          const message = error?.message || "Failed to create account";
          if (message.includes("already exists"))
            throw new ORPCError("CONFLICT", { message });
          throw new ORPCError("BAD_REQUEST", { message });
        });
    },
  );

import { z } from "zod";
import { userSelectSchema } from "@/core/entities/user.entity";
import { base } from "@/orpc/context";
import { requireAdmin } from "@/orpc/middlewares";

export default base
  .route({ method: "GET", path: "/list" })
  .input(
    z.object({
      limit: z.coerce.number().optional().default(10),
      offset: z.coerce.number().optional().default(0),
      search: z.string().optional(),
    }),
  )
  .output(
    z.object({
      users: userSelectSchema.array(),
      total: z.number(),
      hasMore: z.boolean(),
    }),
  )
  .use(requireAdmin)
  .handler(async ({ input, context: { di } }) => {
    const userRepository = di.getUserRepository();

    const { users, total } = await userRepository.list(input);

    const hasMore = input.offset + input.limit < total;

    return {
      users,
      total,
      hasMore,
    };
  });

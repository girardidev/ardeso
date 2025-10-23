import { userSelectSchema } from "@/core/entities/user.entity";
import { base } from "@/orpc/context";
import { requireAuth } from "@/orpc/middlewares";

export default base
  .route({ method: "GET", path: "/me" })
  .output(userSelectSchema)
  .use(requireAuth)
  .handler(async ({ context: { userId, di } }) => {
    const userRepository = di.getUserRepository();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  });

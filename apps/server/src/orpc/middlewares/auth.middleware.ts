import { ORPCError } from "@orpc/server";
import { base } from "@/orpc/context";

export const requireAuth = base.middleware(
  ({ next, context: { headers, di } }) => {
    const jwtService = di.getJWTService();

    const token = headers.get("authorization")?.split(" ")[1];

    if (!token) {
      throw new ORPCError("UNAUTHORIZED");
    }

    const user = jwtService.verifyAccessToken(token);

    if (!user) {
      throw new ORPCError("UNAUTHORIZED", { data: { shouldRevalidate: true } });
    }

    return next({
      context: {
        userId: user.userId,
        userRole: user.role,
      },
    });
  },
);

export const requireAdmin = requireAuth.concat(
  ({ next, context: { userRole } }) => {
    if (userRole !== "ADMIN") throw new ORPCError("UNAUTHORIZED");

    return next();
  },
);

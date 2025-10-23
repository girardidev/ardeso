import { isDefinedError, ORPCError } from "@orpc/server";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export function handleError(error: unknown) {
  if (isDefinedError(error)) {
    return;
  }

  if (error instanceof ORPCError) {
    throw new ORPCError(error.name, {
      message: error.message,
      data: error.data,
      cause: error.cause,
      status: error.status,
      defined: true,
    });
  }

  if (error instanceof TokenExpiredError) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Token expired",
      defined: true,
      data: { shouldRevalidate: true },
    });
  }

  if (error instanceof JsonWebTokenError) {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Invalid token",
      defined: true,
    });
  }

  console.error(error);

  throw new ORPCError("INTERNAL_SERVER_ERROR", {
    message: "Internal server error",
    defined: true,
  });
}

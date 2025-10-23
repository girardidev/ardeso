import z from "zod";
import { base } from "@/orpc/context";

export default base
  .route({ path: "/" })
  .output(z.string())
  .handler(async () => {
    return "Hello World!";
  });

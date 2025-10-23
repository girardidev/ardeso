import { createORPCClient } from "@orpc/client";
import type { JsonifiedClient } from "@orpc/openapi-client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { link } from "./orpc-link";
import type { ApiType } from "./types";

export function createClient(token?: string) {
  return createORPCClient<JsonifiedClient<ApiType>>({
    call: async (...data) => {
      data[2].context = {
        ...data[2].context,
        token,
      };

      return link.call(...data);
    },
  });
}

export const client = createClient();
export const orpc = createTanstackQueryUtils(client);

const serverToken = process.env.NEXT_SERVER_TOKEN as string;
export const serverClient = createClient(serverToken);
export const serverOrpc = createTanstackQueryUtils(serverClient);

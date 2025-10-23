import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 10,
        retry: false,
      },
      mutations: {},
      dehydrate: {
        shouldDehydrateQuery: (query) => {
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
          );
        },
        serializeData(data) {
          const { json, meta } = superjson.serialize(data);
          return { json, meta };
        },
      },
      hydrate: {
        deserializeData(data) {
          return superjson.deserialize(data);
        },
      },
    },
  });
}

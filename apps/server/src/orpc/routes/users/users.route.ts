import { lazy } from "@orpc/server";
import { base } from "@/orpc/context";

export default base.prefix("/users").router({
  list: lazy(() => import("./users-list.route")),
  me: lazy(() => import("./users-me.route")),
});

import { lazy } from "@orpc/server";
import { base } from "@/orpc/context";

export default base.prefix("/healthcheck").router({
  ping: lazy(() => import("./healthcheck-ping.route")),
});

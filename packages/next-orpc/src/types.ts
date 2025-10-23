import type { Router } from "@app/server/router";
import type {
  ContractRouterClient,
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from "@orpc/contract";
import type { JsonifiedClient, JsonifiedValue } from "@orpc/openapi-client";

export type ApiInputs = JsonifiedValue<InferContractRouterInputs<Router>>;

export type ApiOutputs = JsonifiedValue<InferContractRouterOutputs<Router>>;

export type ApiType = JsonifiedClient<ContractRouterClient<Router>>;

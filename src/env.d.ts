/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
//type KVNamespace = import("@cloudflare/workers-types").KVNamespace;

//import type { KVNamespace } from "@cloudflare/workers-types";
//type Service = import("@cloudflare/workers-types").Service;
//type BACKEND = import("@cloudflare/workers-types").Service<import("estimates-backend-rpc/src/index").ZipStore>

declare namespace App {
	interface Locals extends Runtime { }
}

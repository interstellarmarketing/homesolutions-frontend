/// <reference path="../.astro/types.d.ts" />
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
//type BACKEND = import("estimates-backend-rpc/src/index").ZipStore

declare namespace App {
	interface Locals extends Runtime { }
}

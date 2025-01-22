// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import icon from "astro-icon";
//
// https://astro.build/config
export default defineConfig({
  output: "server",
  security: {
    checkOrigin: true,
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    },
  }),
  integrations: [tailwind(), react(), icon()],
});

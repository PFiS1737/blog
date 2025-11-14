import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import config from "@/site.config"

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],
  site: config.site,
})

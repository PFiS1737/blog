import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import config from "./src/site.config"

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap()],
  site: config.site,

  vite: {
    plugins: [tailwindcss()],
  },
})


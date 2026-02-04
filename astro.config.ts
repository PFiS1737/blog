import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import expressiveCode from "astro-expressive-code"
import rehypeExternalLinks from "rehype-external-links"
import rehypeKatex from "rehype-katex"
import remarkGemoji from "remark-gemoji"
import remarkGithubAlerts from "remark-github-alerts"
import remarkMath from "remark-math"
import remarkToc from "remark-toc"
import { remarkReadingTime } from "./src/plugins/remark-reading-time"
import { remarkSummary } from "./src/plugins/remark-summary"

export const SITE = "https://pfis1737.github.io"

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
    preserveScriptOrder: true,
  },
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/archives"),
    }),
    expressiveCode({
      defaultProps: {
        showLineNumbers: false,
        wrap: false,
      },
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      themes: ["github-dark-dimmed", "dark-plus", "tokyo-night"],
    }),
    mdx(),
    react(),
  ],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["noreferrer", "noopener"],
          target: "_blank",
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [
      remarkSummary,
      remarkReadingTime,
      remarkToc,
      remarkGithubAlerts,
      remarkMath,
      remarkGemoji,
    ],
  },
  site: SITE,
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
})

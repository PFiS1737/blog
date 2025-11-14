import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeKatex from "rehype-katex"
import remarkGemoji from "remark-gemoji"
import remarkGithubAlerts from "remark-github-alerts"
import remarkMath from "remark-math"
import remarkToc from "remark-toc"
import config from "./src/site.config"

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
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [
      [rehypeHeadingIds, { headingIdCompat: true }],
      [
        rehypeAutolinkHeadings,
        { behavior: "append", content: { type: "text", value: "#" } },
      ],
      [
        rehypeExternalLinks,
        {
          rel: ["noreferrer", "noopener"],
          target: "_blank",
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [remarkToc, remarkGithubAlerts, remarkMath, remarkGemoji],
  },
  site: config.site,
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
})

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
import { pluginCopyToClipboardButton } from "./src/plugins/expressive-code/copy-to-clipboard-button"
import { remarkReadingTime } from "./src/plugins/remark/reading-time"
import { remarkSummary } from "./src/plugins/remark/summary"

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
      frames: {
        showCopyToClipboardButton: false, // Use our custom plugin instead
      },
      plugins: [
        pluginLineNumbers(),
        pluginCollapsibleSections(),
        pluginCopyToClipboardButton(),
      ],
      styleOverrides: {
        frames: {
          frameBoxShadowCssValue: "none",
        },
      },
      themes: ["github-dark"],
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
  site: "https://pfis1737.github.io",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
})

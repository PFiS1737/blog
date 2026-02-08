import { rehypeHeadingIds } from "@astrojs/markdown-remark"
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
import remarkMath from "remark-math"
import remarkToc from "remark-toc"
import { pluginCopyToClipboardButton } from "./src/plugins/expressive-code/copy-to-clipboard-button"
import rehypeGithubAlerts from "./src/plugins/rehype/github-alerts"
import { rehypeHeadingAnchor } from "./src/plugins/rehype/heading-anchor"
import { remarkDescription } from "./src/plugins/remark/description"
import { remarkReadingTime } from "./src/plugins/remark/reading-time"

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
      [rehypeHeadingIds, { headingIdCompat: true }],
      rehypeHeadingAnchor,
      rehypeGithubAlerts,
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
      remarkDescription,
      remarkReadingTime,
      remarkToc,
      remarkMath,
      remarkGemoji,
    ],
  },
  site: "https://pfis1737.github.io",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@primer/react"],
    },
  },
})

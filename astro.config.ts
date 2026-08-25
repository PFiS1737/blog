import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import expressiveCode from "astro-expressive-code"
import { pluginCopyToClipboardButton } from "./src/plugins/expressive-code/copy-to-clipboard-button"
import { externalLinks } from "./src/plugins/hast/external-links"
import { githubAlerts } from "./src/plugins/hast/github-alerts"
import { headingAnchor } from "./src/plugins/hast/heading-anchor"
import { description } from "./src/plugins/mdast/description"
import { gemoji } from "./src/plugins/mdast/gemoji"
import { katex } from "./src/plugins/mdast/katex"
import { readingTime } from "./src/plugins/mdast/reading-time"
import { toc } from "./src/plugins/mdast/toc"

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
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
      cascadeLayer: "code",
      defaultProps: {
        showLineNumbers: false,
        wrap: false,
      },
      frames: {
        showCopyToClipboardButton: false, // Use our custom plugin instead
      },
      plugins: [pluginLineNumbers(), pluginCollapsibleSections(), pluginCopyToClipboardButton()],
      styleOverrides: {
        codeFontFamily: "monospace", // to use the default mono font setting in your browser.
        frames: {
          frameBoxShadowCssValue: "none",
        },
      },
      themes: ["github-dark"],
      useStyleReset: false,
      useThemedSelectionColors: true,
    }),
    mdx(),
    react(),
  ],
  markdown: {
    processor: satteri({
      features: { math: true, smartPunctuation: false },
      hastPlugins: [satteriHeadingIdsPlugin(), headingAnchor(), githubAlerts(), externalLinks()],
      mdastPlugins: [gemoji(), description(), readingTime(), toc(), katex()],
    }),
  },
  site: "https://pfis1737.github.io",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      noExternal: ["@primer/react"],
    },
  },
})

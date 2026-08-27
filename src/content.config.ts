import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import config from "@/site.config"

export const BLOG_PATH = "src/content/posts"

const posts = defineCollection({
  loader: glob({ base: `./${BLOG_PATH}`, pattern: "**/[^_]*.{md,mdx}" }),
  schema: (/* { image } */) =>
    // biome-ignore assist/source/useSortedKeys: better readability
    z.object({
      title: z.string(),
      author: z.string().optional().default(config.author),
      description: z.string().optional(),

      publishDate: z.coerce.date(),
      updateDate: z.coerce.date().optional(),

      // heroImage: image().or(z.string()).optional(),

      tags: z.array(z.string()).optional().default(["unknown"]),
      series: z.string().optional(),

      draft: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),

      toc: z.boolean().optional().default(false),
    }),
})

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/[^_]*.{md,mdx}" }),
})

export const collections = { pages, posts }

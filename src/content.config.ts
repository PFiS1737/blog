import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"
import config from "@/site.config"

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/[^_]*.{md,mdx}" }),
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

export const collections = { posts }

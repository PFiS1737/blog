// See: https://github.com/delucis/astro-blog-full-text-rss/blob/latest/src/pages/rss.xml.ts

import { loadRenderers } from "astro:container"
import { getCollection, render } from "astro:content"
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx"
import rss, { type RSSFeedItem } from "@astrojs/rss"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { transform, walk } from "ultrahtml"
import sanitize from "ultrahtml/transformers/sanitize"
import config from "@/site.config"
import { getSortedPosts } from "@/utils"

const DOCTYPE = /^<!DOCTYPE html>/

export async function GET() {
  const container = await AstroContainer.create({
    renderers: await loadRenderers([getMdxRenderer()]),
  })

  const base = config.site
  const posts = getSortedPosts(await getCollection("posts"))

  const items: RSSFeedItem[] = []
  for (const post of posts) {
    // biome-ignore lint/performance/noAwaitInLoops: .
    const { Content } = await render(post)
    const rawContent = await container.renderToString(Content)
    const content = await transform(rawContent.replace(DOCTYPE, ""), [
      async (node) => {
        await walk(node, (node) => {
          if (node.name === "a" && node.attributes.href?.startsWith("/")) {
            node.attributes.href = base + node.attributes.href
          }
          if (node.name === "img" && node.attributes.src?.startsWith("/")) {
            node.attributes.src = base + node.attributes.src
          }
        })
        return node
      },
      sanitize({ dropElements: ["script", "style"] }),
    ])
    items.push({ ...post.data, content, link: `/posts/${post.id}` })
  }

  return rss({
    description: config.description,
    items,
    site: base,
    title: config.title,
    trailingSlash: false,
  })
}

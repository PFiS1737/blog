import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import config from "@/site.config"

export async function GET(context) {
  const posts = await getCollection("blog")
  return rss({
    description: config.description,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
    site: context.site,
    title: config.title,
  })
}

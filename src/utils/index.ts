import { getCollection } from "astro:content"

export async function getSortedPosts() {
  return (
    await getCollection("posts", ({ data }) => {
      return import.meta.env.DEV ? true : !data.draft
    })
  ).sort(
    (a, b) =>
      (b.data.updatedDate ?? b.data.pubDate).getTime() -
      (a.data.updatedDate ?? a.data.pubDate).getTime()
  )
}

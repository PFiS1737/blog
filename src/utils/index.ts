import { getCollection } from "astro:content"

export async function getSortedPosts() {
  return (
    await getCollection("posts", ({ data }) => {
      return import.meta.env.DEV ? true : !data.draft
    })
  ).sort(
    (a, b) =>
      (b.data.updateDate ?? b.data.publishDate).getTime() -
      (a.data.updateDate ?? a.data.publishDate).getTime()
  )
}

import type { CollectionEntry } from "astro:content"
import kebabcase from "lodash.kebabcase"
import { BLOG_PATH } from "@/content.config"

export type Post = CollectionEntry<"posts">

const postsFilter = ({ data }: Post) => {
  return import.meta.env.DEV ? true : !data.draft
}

export function getSortedPosts(posts: Post[]) {
  return posts
    .filter(postsFilter)
    .sort(
      (a, b) =>
        (b.data.updateDate ?? b.data.publishDate).getTime() -
        (a.data.updateDate ?? a.data.publishDate).getTime()
    )
}

export function getUniqueTags(posts: Post[]) {
  return posts
    .filter(postsFilter)
    .flatMap((post) => post.data.tags)
    .map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex((tag) => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag))
}

export function getPostsByTag(posts: Post[], tag: string) {
  return getSortedPosts(
    posts.filter((post) =>
      post.data.tags.map((tag) => slugifyStr(tag)).includes(tag)
    )
  )
}

export function getPostsByGroupCondition<T>(
  posts: Post[],
  groupFunction: (item: Post, index?: number) => T
) {
  const result = new Map<T, Post[]>()

  posts.forEach((item, i) => {
    const groupKey = groupFunction(item, i)

    if (!result.has(groupKey)) {
      result.set(groupKey, [])
    }

    // biome-ignore lint/style/noNonNullAssertion: safe
    result.get(groupKey)!.push(item)
  })

  return result
}

export default getPostsByGroupCondition

export function slugifyStr(str: string) {
  return kebabcase(str)
}

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter((path) => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter((path) => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map((segment) => slugifyStr(segment)) // slugify each segment path

  const basePath = includeBase ? "/posts" : ""

  // Making sure `id` does not contain the directory
  const blogId = id.split("/")
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length === 0) {
    return [basePath, slug].join("/")
  }

  return [basePath, ...pathSegments, slug].join("/")
}

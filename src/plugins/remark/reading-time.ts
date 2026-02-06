// See: https://docs.astro.build/en/recipes/reading-time/

import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toString as mdastToString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export const remarkReadingTime: RemarkPlugin = () => {
  return (tree, { data }) => {
    if (data.astro?.frontmatter) {
      const textOnPage = mdastToString(tree)
      const readingTime = getReadingTime(textOnPage)
      // readingTime.text will give us minutes read as a friendly string,
      // i.e. "3 min read"
      data.astro.frontmatter.readingTime = readingTime
    }
  }
}

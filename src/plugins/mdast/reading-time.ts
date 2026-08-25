// See: https://docs.astro.build/en/recipes/reading-time/

import getReadingTime from "reading-time"
import { defineMdastPlugin } from "satteri"

export const readingTime = () => {
  return defineMdastPlugin({
    after(root, ctx) {
      const content = ctx.textContent(root)

      // NOTE: readingTime.text will give us minutes read as a friendly string,
      //       e.g. "3 min read"
      const readingTime = getReadingTime(content)

      if (ctx.data.astro?.frontmatter) {
        ctx.data.astro.frontmatter.readingTime = readingTime
      }
    },
    name: "reading-time",
  })
}

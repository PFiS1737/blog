// See: https://github.com/remarkjs/remark-toc

import { toc as mdastToc, type Options } from "mdast-util-toc"
import { defineMdastPlugin } from "satteri"

export const toc = (options?: Options) => {
  const settings = {
    ...options,
    heading: options?.heading || "(table[ -]of[ -])?contents?|toc",
    tight: options && typeof options.tight === "boolean" ? options.tight : true,
  }

  return defineMdastPlugin({
    after(root, ctx) {
      const toc = mdastToc(root, settings)

      if (toc.index === undefined || toc.index === -1 || !toc.map) {
        return
      }

      ctx.insertChildAt(root, toc.index, toc.map)
    },
    name: "toc",
  })
}

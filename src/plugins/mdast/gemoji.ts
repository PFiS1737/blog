// See: https://github.com/remarkjs/remark-gemoji

import { nameToEmoji } from "gemoji"
import { defineMdastPlugin } from "satteri"

const GEMOJI_REGEX = /:(\+1|[-\w]+):/g

export const gemoji = () => {
  return defineMdastPlugin({
    name: "gemoji",
    text(node, ctx) {
      ctx.setProperty(
        node,
        "value",
        node.value.replaceAll(GEMOJI_REGEX, (s, name) => nameToEmoji[name] ?? s)
      )
    },
  })
}

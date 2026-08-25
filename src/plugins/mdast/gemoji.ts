// See: https://github.com/remarkjs/remark-gemoji

import { nameToEmoji } from "gemoji"
import { defineMdastPlugin } from "satteri"

const REGEX = /:(\+1|[-\w]+):/g

export const gemoji = () => {
  return defineMdastPlugin({
    name: "gemoji",
    text(node, ctx) {
      ctx.setProperty(
        node,
        "value",
        node.value.replaceAll(REGEX, (s, $1) => (Object.hasOwn(nameToEmoji, $1) ? nameToEmoji[$1] : s))
      )
    },
  })
}

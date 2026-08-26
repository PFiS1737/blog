import { emojiToName } from "gemoji"
import { defineHastPlugin, type HastContent } from "satteri"
import { reactToHast } from "@/utils/server"

const UNICODE_EMOJI_REGEX = /\p{RGI_Emoji}/gv

export const wrapEmojis = () => {
  return defineHastPlugin({
    name: "wrap-emojis",
    text(node, ctx) {
      if (UNICODE_EMOJI_REGEX.test(node.value)) {
        const text = node.value

        const newNodes: HastContent[] = []

        let lastIndex = 0

        text.replaceAll(UNICODE_EMOJI_REGEX, (emoji, idx: number) => {
          if (idx > lastIndex) {
            newNodes.push({ type: "text", value: text.slice(lastIndex, idx) })
          }

          newNodes.push(
            reactToHast(
              <span aria-label={(emojiToName[emoji] ?? "unknown emoji").replace(/_/g, " ")} role="img">
                {emoji}
              </span>
            )
          )

          lastIndex = idx + emoji.length

          return emoji
        })

        if (lastIndex < text.length) {
          newNodes.push({ type: "text", value: text.slice(lastIndex) })
        }

        ctx.replaceNode(node, newNodes)
      }
    },
  })
}

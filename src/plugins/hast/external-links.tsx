import { LinkExternalIcon } from "@primer/octicons-react"
import { defineHastPlugin } from "satteri"
import { reactToHast } from "@/utils/server"

export const externalLinks = () => {
  return defineHastPlugin({
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties.href
        if (typeof href === "string" && href.startsWith("http")) {
          ctx.setProperty(node, "target", "_blank")
          ctx.setProperty(node, "rel", "noopener noreferrer")
          ctx.appendChild(node, reactToHast(<LinkExternalIcon className="ms-1 inline-block" size={16} />))
        }
      },
    },
    name: "external-links",
  })
}

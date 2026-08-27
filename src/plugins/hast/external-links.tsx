import { LinkExternalIcon, MarkGithubIcon } from "@primer/octicons-react"
import { defineHastPlugin } from "satteri"
import { reactToHast } from "@/utils/server"

export const externalLinks = () => {
  return defineHastPlugin({
    element: {
      filter: ["a"],
      visit(node, ctx) {
        const href = node.properties.href
        if (typeof href === "string" && href.startsWith("http")) {
          const url = new URL(href)
          const isGithub = url.hostname === "github.com" || url.hostname.endsWith(".github.com")

          if (isGithub) {
            ctx.prependChild(node, reactToHast(<MarkGithubIcon className="me-1 inline-block" size={16} />))
          } else {
            ctx.appendChild(node, reactToHast(<LinkExternalIcon className="ms-1 inline-block" size={16} />))
          }

          ctx.setProperty(node, "target", "_blank")
          ctx.setProperty(node, "rel", "noopener noreferrer")
        }
      },
    },
    name: "external-links",
  })
}

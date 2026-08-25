import { AlertIcon, InfoIcon, LightBulbIcon, ReportIcon, StopIcon } from "@primer/octicons-react"
import { defineHastPlugin } from "satteri"
import { reactToHast } from "@/utils/server"

const REGEX = /^\[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]/i

const ICONS = {
  caution: StopIcon,
  important: ReportIcon,
  note: InfoIcon,
  tip: LightBulbIcon,
  warning: AlertIcon,
}

export const githubAlerts = () => {
  return defineHastPlugin({
    element: {
      filter: ["blockquote"],
      visit(node, ctx) {
        // NOTE: The first child is always a { type: 'text', value: '\n' }, skipping it.

        const child = node.children[1]
        if (!(child.type === "element" && child.tagName === "p")) {
          console.error("[rehypeGithubAlerts] Unexpected blockquote structure:", node)
          return
        }

        const text = child.children[0]
        if (text?.type !== "text") {
          return
        }

        const match = text.value.match(REGEX)
        if (!match) {
          return
        }

        ctx.setProperty(text, "value", text.value.slice(match[0].length).trimStart())

        const type = match[1]?.toLowerCase()

        const Icon = ICONS[type as keyof typeof ICONS]

        const ret = reactToHast(
          <div className={`markdown-alert markdown-alert-${type}`}>
            <p className="markdown-alert-title">
              <Icon className="mr-2" size={16} />
              {type}
            </p>
          </div>
        )

        ret.children.push(...node.children)

        return ret
      },
    },
    name: "gitHub-alerts",
  })
}

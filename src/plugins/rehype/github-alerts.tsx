import type { RehypePlugin } from "@astrojs/markdown-remark"
import {
  AlertIcon,
  InfoIcon,
  LightBulbIcon,
  ReportIcon,
  StopIcon,
} from "@primer/octicons-react"
import { visit } from "unist-util-visit"
import { reactToHast } from "../../utils/server"

const REGEX = /^\[!(TIP|NOTE|IMPORTANT|WARNING|CAUTION)\]/

const ICONS = {
  caution: StopIcon,
  important: ReportIcon,
  note: InfoIcon,
  tip: LightBulbIcon,
  warning: AlertIcon,
}

export const rehypeGithubAlerts: RehypePlugin = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!(parent && index && node.tagName === "blockquote")) {
        return
      }

      const child = node.children[1] // NOTE: The first child is always a { type: 'text', value: '\n' }
      if (!(child.type === "element" && child.tagName === "p")) {
        console.error(
          "[rehypeGithubAlerts] Unexpected blockquote structure:",
          node
        )
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

      const type = match[1]?.toLowerCase()

      if (index === undefined || !parent) {
        return
      }

      text.value = text.value.slice(match[0].length).trimStart()

      const Icon = ICONS[type as keyof typeof ICONS]

      parent.children[index] = reactToHast(
        <div className={`markdown-alert markdown-alert-${type}`}>
          <p className="markdown-alert-title">
            <Icon className="mr-2" size={16} />
            {type}
          </p>
        </div>
      )

      parent.children[index].children.push(...node.children)
    })
  }
}

export default rehypeGithubAlerts

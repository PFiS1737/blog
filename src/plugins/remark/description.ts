// See: https://github.com/stelcodes/multiterm-astro/blob/main/src/plugins/remark-description.ts

import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toString as mdastToString } from "mdast-util-to-string"

export const remarkDescription: RemarkPlugin = (options?: { maxChars?: number }) => {
  const maxChars = options?.maxChars || 200

  return (tree, { data }) => {
    const findFirstParagraph = (node: typeof tree | (typeof tree.children)[number]): string | undefined => {
      if ("children" in node && Array.isArray(node.children)) {
        for (const child of node.children) {
          if (child.type === "paragraph" && child.children.length > 0 && child.children[0].type !== "image") {
            const str = mdastToString(child).trim()
            if (str.length > 0) {
              return str
            }
          } else {
            const result = findFirstParagraph(child)
            if (result) {
              return result
            }
          }
        }
      }
      return
    }

    let summary = data.astro?.frontmatter?.description || findFirstParagraph(tree)

    if (summary && data.astro?.frontmatter) {
      if (summary.length > maxChars) {
        const lastSpace = summary.slice(0, maxChars).lastIndexOf(" ")
        summary = `${summary.slice(0, lastSpace)}…`
      }
      data.astro.frontmatter.description = summary
    }
  }
}

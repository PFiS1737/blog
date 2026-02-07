import type { RehypePlugin } from "@astrojs/markdown-remark"
import { selectAll } from "hast-util-select"
import { h } from "hastscript"

export const rehypeHeadingAnchor: RehypePlugin = () => {
  return (tree) => {
    const headings = selectAll("h2, h3, h4, h5, h6", tree)

    for (const heading of headings) {
      heading.properties.className = "group"

      heading.children.push(
        h(
          "a",
          {
            className:
              "heading-link ms-2 no-underline opacity-75 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100",
            href: `#${heading.properties.id}`,
          },
          h("span", { ariaHidden: true }, "#")
        )
      )
    }
  }
}

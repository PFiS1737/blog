import type { RehypePlugin } from "@astrojs/markdown-remark"
import type { Text } from "hast"
import { selectAll } from "hast-util-select"
import { reactToHast } from "../../utils/server"

export const rehypeHeadingAnchor: RehypePlugin = () => {
  return (tree) => {
    const headings = selectAll("h2, h3, h4, h5, h6", tree)

    for (const heading of headings) {
      const text = (heading.children[0] as Text).value

      heading.properties.className = "group"

      heading.children.push(
        reactToHast(
          <a
            className="heading-link ms-2 no-underline opacity-75 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            href={`#${heading.properties.id}`}
          >
            <span aria-hidden={true}>#</span>
            <span className="sr-only">Link to heading: {text}</span>
          </a>
        )
      )
    }
  }
}

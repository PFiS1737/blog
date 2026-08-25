import { defineHastPlugin } from "satteri"
import { reactToHast } from "@/utils/server"

export const headingAnchor = () => {
  return defineHastPlugin({
    element: {
      filter: ["h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        ctx.setProperty(node, "className", ["group"])

        ctx.appendChild(
          node,
          reactToHast(
            <a
              className="heading-link ms-2 no-underline opacity-75 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
              href={`#${node.properties.id}`}
            >
              <span aria-hidden={true}>#</span>
              <span className="sr-only">Link to heading: {ctx.textContent(node)}</span>
            </a>
          )
        )
      },
    },
    name: "heading-anchor",
  })
}

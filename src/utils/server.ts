import type { Element } from "hast"
import type { ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import rehypeParse from "rehype-parse"
import { unified } from "unified"

export function reactToHast(element: ReactElement) {
  const html = renderToStaticMarkup(element)
  return unified().use(rehypeParse, { fragment: true }).parse(html).children[0] as Element
}

import type { Element, Root } from "hast"
import type { ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { htmlToHast } from "satteri"

export function reactToHast(element: ReactElement) {
  const html = renderToStaticMarkup(element)
  const root = htmlToHast(html, { fragment: true }) as Root
  return root.children[0] as Element
}

import { defineMdastPlugin } from "satteri"

export const description = (options?: { maxChars?: number }) => {
  const maxChars = options?.maxChars || 200

  let firstParagraph: string | undefined

  return defineMdastPlugin({
    after(_, ctx) {
      if (ctx.data.astro?.frontmatter && firstParagraph && !ctx.data.astro.frontmatter.description) {
        ctx.data.astro.frontmatter.description = firstParagraph
      }
    },
    name: "description",
    paragraph(node, ctx) {
      if (!firstParagraph) {
        let text = ctx.textContent(node)

        if (text.length > maxChars) {
          const lastSpace = text.slice(0, maxChars).lastIndexOf(" ")
          text = `${text.slice(0, lastSpace)}…`
        }

        firstParagraph = text
      }
    },
  })
}

import { type KatexOptions, renderToString } from "katex"
import { defineMdastPlugin, type RawMdastContent } from "satteri"

export const katex = (options?: KatexOptions) => {
  const render = (source: string, displayMode: boolean): RawMdastContent => ({
    mdxExpressions: false,
    raw: renderToString(source, {
      ...options,
      displayMode,
    }),
  })

  return defineMdastPlugin({
    inlineMath: (node) => render(node.value, false),
    math: (node) => render(node.value, true),
    name: "katex",
  })
}

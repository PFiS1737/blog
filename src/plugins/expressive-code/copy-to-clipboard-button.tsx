// See: https://github.com/expressive-code/expressive-code/blob/main/packages/%40expressive-code/plugin-frames/src/copy-js-module.ts

import { definePlugin } from "@expressive-code/core"
import { CheckIcon, CopyIcon } from "@primer/octicons-react"
import type { Element, Node } from "hast"
import { select } from "hast-util-select"
import { reactToHast } from "../../utils/server"

/**
 * Helper functions so that we can have a syntax highlight from tree-sitter.
 */
const js = (str: TemplateStringsArray) => [str.join("")]
const css = (str: TemplateStringsArray) => str.join("")

export function pluginCopyToClipboardButton() {
  // biome-ignore assist/source/useSortedKeys: better readability
  return definePlugin({
    name: "Copy To Clipboard Button",
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        const pre = select("pre", renderData.blockAst)
        if (!pre) {
          return
        }

        pre.children.push(
          reactToHast(
            <button
              className="copy-button"
              data-code={codeBlock.code}
              type="button"
            >
              <CopyIcon
                className="show size-4"
                fill="rgb(145, 152, 161)"
                size={16}
              />
              <CheckIcon className="size-4" fill="rgb(87, 171, 90)" size={16} />
            </button>
          ) as Node as Element
        )
      },
    },
    jsModules: js`
      async function clickHandler(event) {
        const btn = event.currentTarget
        const svgCopy = btn.children[0]
        const svgCheck = btn.children[1]

        if (!svgCopy.classList.contains("show")) {
          return
        }

        const code = btn.dataset.code

        await navigator.clipboard.writeText(code)

        btn.classList.add("show")
        svgCopy.classList.remove("show")
        svgCheck.classList.add("show")

        const resetShow = () => {
          btn.classList.remove("show")
          svgCopy.classList.add("show")
          svgCheck.classList.remove("show")
        }
        const timeoutId = setTimeout(resetShow, 1500)
        btn.addEventListener(
          "blur",
          () => {
            resetShow()
            clearTimeout(timeoutId)
          },
          { once: true },
        )
      }

      function initButtons(container) {
        if (container?.querySelectorAll) {
          for (const btn of container.querySelectorAll(
            ".expressive-code .copy-button"
          )) {
            btn.addEventListener("click", clickHandler)
          }
        }
      }
      initButtons(document)

      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            initButtons(node)
          }
        }
      }).observe(document.getElementById("article"), { childList: true, subtree: true })

      document.addEventListener("astro:page-load", () => {
        initButtons(document.getElementById("article"))
      })
    `,
    baseStyles: css`
      .copy-button {
        position: absolute;
        right: 0px;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 32px;
        width: 32px;

        margin: 8px;
        padding: 0px;
        border: none;
        border-radius: 6px;

        cursor: pointer;
        user-select: none;

        background: transparent;

        &:hover {
          background: rgb(47, 55, 66);
        }

        /* hide copy button when there is no JavaScript */
        @media (scripting: none) {
          display: none;
        }

        /* RTL support: Code is always LTR, so the inline copy button
          must match this to avoid overlapping the start of lines */
        direction: ltr;
        unicode-bidi: isolate;

        svg {
          display: none;
        }
        svg.show {
          display: revert;
        }
      }

      .frame:not(:hover) .copy-button:not(.show) {
        display: none;
      }

      .frame:hover .copy-button:not(:hover) {
        background: transparent;
      }
    `,
  })
}

// @see https://github.com/expressive-code/expressive-code/blob/main/packages/%40expressive-code/plugin-frames/src/copy-js-module.ts

import { definePlugin } from "@expressive-code/core"
import { h, s, select } from "@expressive-code/core/hast"

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
          h(
            "button",
            {
              className: "copy-button",
              dataCode: codeBlock.code,
            },
            [
              s(
                "svg",
                {
                  ariaHidden: "true",
                  className: "octicon octicon-copy size-4 show",
                  fill: "rgb(145, 152, 161)",
                  viewBox: "0 0 16 16",
                },
                [
                  s("path", {
                    d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z",
                  }),
                  s("path", {
                    d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z",
                  }),
                ]
              ),
              s(
                "svg",
                {
                  ariaHidden: "true",
                  className: "octicon octicon-check size-4",
                  fill: "rgb(87, 171, 90)",
                  viewBox: "0 0 16 16",
                },
                [
                  s("path", {
                    d: "M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z",
                  }),
                ]
              ),
            ]
          )
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
        for (const btn of container.querySelectorAll(
          ".expressive-code .copy-button"
        )) {
          btn.addEventListener("click", clickHandler)
        }
      }
      initButtons(document)

      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            initButtons(node)
          }
        }
      }).observe(document.body, { childList: true, subtree: true })

      document.addEventListener("astro:page-load", () => {
        initButtons(document)
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
          background: rgb(47, 55, 66); /* TODO: dark mode background color */
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

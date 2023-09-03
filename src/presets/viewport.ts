import type { Preset, SourceCodeTransformer } from '@unocss/core'
import { colorToString, hasParseableColor, parseColor } from '@unocss/preset-mini/utils'

const unitRE = /(-?[\.\d]+)(rem|px|pt)/g

export interface ViewportOptions {
  /**
   * viewport size
   * @default 390 (iPhone X)
   */
  viewportSize?: number
}

export default function viewport(options: ViewportOptions = {}): Preset {
  const { viewportSize = 390 } = options

  return {
    name: '@yafh/viewport',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && unitRE.test(value))
          i[1] = value.replace(unitRE, (_, p1) => `${p1 * viewportSize}px`)
      })
    },
  }
}

const dollarValueRE = /(["'`])\$:([^\1]*?)\1/g

export function transformerDollarValue(): SourceCodeTransformer {
  return {
    name: '@yafh/transformer-dollar-value',
    enforce: 'pre',
    async transform(s, _, { uno }) {
      const matchs = [...s.original.matchAll(dollarValueRE)]

      if (!matchs.length)
        return

      for (const match of matchs) {
        const input = match[0]
        const start = match.index!
        const content = match[2].trim()

        let transformed = ''
        if (!Number.isNaN(+content)) {
          transformed = `${content}px`
        } else if (hasParseableColor(content, uno.config.theme)) {
          const color = parseColor(content, uno.config.theme)
          if (color)
            transformed = colorToString(color.cssColor!, color.alpha)
        }

        s.overwrite(start + 1, start + input.length - 1, transformed)
      }
    },
  }
}

import { type HighlightAnnotation, type Preset, type SourceCodeTransformer } from '@unocss/core'
import { type Theme } from '@unocss/preset-mini'
import { hasParseableColor } from '@unocss/preset-mini/utils'
import { parseColorValue } from '@/utils/color'

const dollarValueRE = /(["'`])\$#?:([-\d\w\.\/]*)/g

function parseValue(original: string, theme: Theme, meta: boolean): string | undefined {
  if (!original?.trim())
    return undefined
  else if (!Number.isNaN(+original))
    return `${+original * 0.25}rem`
  else if (hasParseableColor(original, theme))
    return parseColorValue(original, theme, meta)
}

export function transformerDollarValue(): SourceCodeTransformer {
  return {
    name: '@yafh/transformer-dollar-value',
    enforce: 'post',
    async transform(s, _, { uno }) {
      const matchs = [...s.original.matchAll(dollarValueRE)]

      if (!matchs.length)
        return

      const highlightAnnotations: HighlightAnnotation[] = []
      for (const match of matchs) {
        const input = match[0]
        const start = match.index!
        const content = match[2].trim()

        const transformed = parseValue(content, uno.config.theme, input.includes('$#')) || ''
        s.overwrite(start + 1, start + input.length, transformed)

        highlightAnnotations.push({
          className: input.substring(1),
          offset: start + 1,
          length: input.length - 1,
        })
      }

      return {
        highlightAnnotations,
      }
    },
  }
}

export function dollarValue(): Preset<Theme> {
  return {
    name: '@yafh/dollar-value',
    rules: [
      [
        /^\$#?:([-\d\w\.\/]*)$/,
        (match, context) => {
          return {
            '--dollar-value': parseValue(match[1], context.theme, match[0].includes('$#')) || 'none',
          }
        },
        { autocomplete: ['($|$#):$colors', '($|$#):<num>'] },
      ],
    ],
  }
}

export default dollarValue

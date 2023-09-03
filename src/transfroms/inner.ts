import { type SourceCodeTransformer, expandVariantGroup } from '@unocss/core'

const innerRE = /(["'`]):inner:\s([^\1]*?)\1/g

export function transformerInner(): SourceCodeTransformer {
  return {
    name: '@yafh/transformer-cinner',
    enforce: 'pre',
    async transform(s, _, { uno }) {
      const matchs = [...s.original.matchAll(innerRE)]

      if (!matchs.length)
        return

      for (const match of matchs) {
        const start = match.index!
        const input = match[0]
        const content = expandVariantGroup(match[2].trim())

        const tokens = (await Promise.all(content.split(/\s+/).filter(Boolean).map(e => uno.parseToken(e))))
        const styleContent = tokens.flat().map(e => e?.[2]).filter(Boolean).join('')

        s.overwrite(start + 1, start + input.length - 1, styleContent)
      }
    },
  }
}

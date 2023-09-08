import type { Preset } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { type ViewPortOption, convert, convertOptionSymbol } from '@/utils/convert'

export function presetConvert(option: ViewPortOption): Preset<Theme> {
  return {
    name: '@yafh/convert',
    extendTheme: (theme: any) => {
      theme[convertOptionSymbol] = option
      return theme
    },
    postprocess: (util) => {
      util.entries.forEach((e) => {
        const value = e[1]
        if (typeof value === 'string')
          e[1] = convert(value, option)
      })
    },
  }
}

export default presetConvert

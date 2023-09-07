import type { Preset } from '@unocss/core'
import { type ViewPortOption, convert as _convert, convertOptionSymbol } from '@/utils/convert'

export function convert(option: ViewPortOption): Preset<object> {
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
          e[1] = _convert(value, option)
      })
    },
  }
}

export default convert

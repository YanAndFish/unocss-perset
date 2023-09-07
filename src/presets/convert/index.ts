import type { Preset } from '@unocss/core'
import { type ViewPortOption, convertOptionSymbol } from '@/utils/convert'

export function convert(option: ViewPortOption): Preset<object> {
  return {
    name: '@yafh/convert',
    extendTheme: (theme: any) => {
      theme[convertOptionSymbol] = option
      return theme
    },
    postprocess: (util) => {
      console.log(util.selector)

      util.entries.forEach((e) => {
        const value = e[1]
        console.log('value', e)
      })
    },
  }
}

export default convert

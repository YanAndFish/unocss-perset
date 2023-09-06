import type { Preset } from '@unocss/core'
import { type Theme } from '@unocss/preset-mini'

// rules
import shadow from './rules/shadow'

export function yafh(): Preset<Theme> {
  return {
    name: '@yafh/yafh',
    rules: [
      shadow,
    ],
    shortcuts: [
      [/^f-(.*)$/, ([, c]) => `text-${c}`, { autocomplete: ['f-<num>', 'f-$colors'] }],
      [/^r-(.*)$/, ([, c]) => `rounded-${c}`, { autocomplete: 'r-<num>' }],
    ],
  }
}

export default yafh

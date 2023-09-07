import { defineRule } from '@/utils/common'
import { round } from '@/utils/unit'

function createShadow(level: number) {
  const prefix = 'var(--un-shadow-inset)'
  const suffix = (opacity: number) => `var(--un-shadow-color, rgba(0,0,0,${opacity}))`

  return [
    `${prefix} 0 ${round(level * 0.4583)}px ${round(level * 0.625)}px ${round(level * -0.2917)}px ${suffix(0.2)}`,
    `${prefix} 0 ${level}px ${round(level * 1.583)}px ${round(level * 0.125)}px ${suffix(0.14)}`,
    `${prefix} 0 ${round(level * 0.375)}px ${round(level * 1.917)}px ${round(level * 0.333)}px ${suffix(0.12)}`,
  ].join(', ')
}

export default defineRule({
  rule: /^shadow(?:-([\d\.]+))$/,
  metcher: (match) => {
    const [, d] = match

    if (!Number.isNaN(+d)) {
      return {
        '--un-shadow': createShadow(+d),
        'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
      }
    }
  },
  meta: {
    autocomplete: 'shadow-<num>',
  },
})

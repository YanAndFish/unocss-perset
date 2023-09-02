import { type Preset } from '@unocss/core'

function createShadow(level: number) {
  const prefix = 'var(--un-shadow-inset)'
  const suffix = (opacity: number) => `var(--un-shadow-color, rgba(0,0,0,${opacity}))`

  return [
    `${prefix} 0 ${level * 0.4583}px ${level * 0.625}px ${level * -0.2917}px ${suffix(0.2)}`,
    `${prefix} 0 ${level}px ${level * 1.583}px ${level * 0.125}px ${suffix(0.14)}`,
    `${prefix} 0 ${level * 0.375}px ${level * 1.917}px ${level * 0.333}px ${suffix(0.12)}`,
  ].join(', ')
}

export function yafh(): Preset {
  return {
    name: 'yafh',
    rules: [
      [/^shadow(?:-([\d\.]+))$/, (match) => {
        const [, d] = match

        if (!Number.isNaN(+d)) {
          return {
            '--un-shadow': createShadow(+d),
            'box-shadow': 'var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)',
          }
        }
      }],
    ],
    variants: [
      {
        name: '@yafh/doller-px',
        match: (matcher) => {
          return {
            matcher: matcher.replace(/\$([\d\.\-]+)/g, '[$1px]'),
          }
        },
      },
    ],
    shortcuts: [
      [/^f-(.*)$/, ([, c]) => `text-${c}`],
      [/^r-(.*)$/, ([, c]) => `rounded-${c}`],
    ],

  }
}

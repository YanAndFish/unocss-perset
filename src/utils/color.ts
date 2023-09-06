import type { ParsedColorValue } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { colorToString, hasParseableColor, parseColor } from '@unocss/preset-mini/utils'

function colorToHexString(color: ParsedColorValue, prefix = true) {
  if (color.color) {
    const alpha = +(color.alpha ?? 1)
    const _color = `${color.color.toUpperCase().trim()}${alpha === 1 ? '' : (Math.round(alpha * 255)).toString(16)}`
    return prefix ? _color : _color.substring(1)
  }
}

export function parseColorValue(value: string, theme: Theme, hex = false) {
  if (hasParseableColor(value, theme)) {
    const color = parseColor(value, theme)
    if (color?.cssColor)
      return hex ? colorToHexString(color) : colorToString(color.cssColor, color.alpha ?? 1)
  }
}

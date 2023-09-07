const numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i
const unitOnlyRE = /^(px)$/i

export function round(n: number) {
  return n.toFixed(10).replace(/\.0+$/, '').replace(/(\.\d+?)0+$/, '$1')
}

export function rem(str: string) {
  if (str.match(unitOnlyRE))
    return `1${str}`
  const match = str.match(numberWithUnitRE)
  if (!match)
    return
  const [, n, unit] = match
  const num = Number.parseFloat(n)
  if (!Number.isNaN(num)) {
    if (num === 0)
      return '0'
    return unit ? `${round(num)}${unit}` : `${round(num / 4)}rem`
  }
}

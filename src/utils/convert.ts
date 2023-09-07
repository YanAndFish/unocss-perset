export const convertOptionSymbol = Symbol.for('yafh:convertOption')

type Unit = 'px' | 'rem' | 'pt' | 'viewport'

interface RemBase {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number

}

interface ConvertPx extends RemBase {
  target: 'px'
  /**
   * @default 'rem'
   */
  source?: Exclude<Unit, 'px' | 'viewport'> | Exclude<Unit, 'px' | 'viewport'>[]
}

interface ConvertRem extends RemBase {
  target: 'rem'
  /**
   * @default 'px'
   */
  source?: Exclude<Unit, 'rem' | 'viewport'> | Exclude<Unit, 'rem' | 'viewport'>[]
}

interface ConvertViewport extends RemBase {
  target: 'viewport'
  /**
   * @default 'px'
   */
  source?: Exclude<Unit, 'viewport'> | Exclude<Unit, 'viewport'>[]
  /**
   * viewport width
   * @default 390
   */
  viewportWidth?: number
}

export type ViewPortOption = ConvertPx | ConvertRem | ConvertViewport

export function isCorventPx(option: ViewPortOption): option is ConvertPx {
  return option.target === 'px'
}

export function isConvertRem(option: ViewPortOption): option is ConvertRem {
  return option.target === 'rem'
}

export function isConvertViewport(option: ViewPortOption): option is ConvertViewport {
  return option.target === 'viewport'
}

export function resolveConvertOption(theme: object): ViewPortOption | undefined {
  return theme ? (theme as any)[convertOptionSymbol] : undefined
}

function resolveUnitRE(unit: Exclude<Unit, 'viewport'>[]): RegExp {
  return RegExp(`(-?[\\.\\d]+)(${unit.join('|')})`, 'g')
}

export function convert(source: string, option: ViewPortOption) {
  if (isCorventPx(option)) {
    //
  } else if (isConvertRem(option)) {
    //
  } else if (isConvertViewport(option)) {
    //
  }
}

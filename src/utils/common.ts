import type { CSSEntries, CSSObject, DynamicMatcher, Rule, RuleMeta } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'

export interface StaticRuleOption {
  rule: string
  metcher: CSSObject | CSSEntries
  meta?: RuleMeta
}

export interface DynamicRuleOption<T extends object = Theme> {
  rule: RegExp
  metcher: DynamicMatcher<T>
  meta?: RuleMeta
}

/**
 * Define a rule use object option
 * @param option
 */
export function defineRule<T extends object = Theme>(option: StaticRuleOption): Rule<T>
export function defineRule<T extends object = Theme>(option: DynamicRuleOption<T>): Rule<T>
export function defineRule<T extends object = Theme>(option: StaticRuleOption | DynamicRuleOption<T>): Rule<T> {
  const rule: any = [option.rule, option.metcher]
  option.meta && rule.push(option.meta)
  return rule
}

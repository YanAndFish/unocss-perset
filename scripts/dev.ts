import { presetUno } from 'unocss'
import { yafh } from '../src/presets/yafh'
import { generate } from './utils'

generate('yafh', {
  presets: [yafh(), presetUno()],
}, [...Array.from({ length: 100 }).map((_, i) => {
  return `shadow-${i}`
}), 'shadow-cyan-500/50', 'shadow-indigo-500/50', 'shadow-indigo-500/50'])

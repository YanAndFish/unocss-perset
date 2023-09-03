import { presetUno, transformerCompileClass } from 'unocss'
import yafh from '../src/presets/yafh'
import { generate } from './utils'

generate('yafh', {
  presets: [yafh(), presetUno()],
  transformers: [transformerCompileClass()],
}, [])

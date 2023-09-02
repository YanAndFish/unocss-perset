import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: false,
  dts: true,
  clean: true,
  cjsInterop: true,
  entryPoints: ['src/presets/yafh.ts'],
  format: ['cjs', 'esm'],
})

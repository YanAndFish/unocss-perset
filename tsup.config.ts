import { writeFile } from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import { defineConfig } from 'tsup'
import glob from 'fast-glob'

async function generateDeclareFile(sourcePath: string) {
  const name = basename(sourcePath, '.ts')
  const path = dirname(sourcePath).replace(/^src/, 'dist')

  const content = `export * from './${path}/${name}'\nexport { default } from './${path}/${name}'`
  await writeFile(`./${name}.d.ts`, content)
}

const entryPoints = ['src/index.ts', 'src/presets/*.ts']

export default defineConfig({
  splitting: false,
  dts: true,
  clean: true,
  cjsInterop: true,
  entryPoints,
  format: ['cjs', 'esm'],
  onSuccess: async () => {
    const entrys = await glob(entryPoints, { onlyFiles: true })
    await Promise.all(entrys.map(generateDeclareFile))
  },
})

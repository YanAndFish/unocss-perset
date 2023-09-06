import { writeFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import { basename, dirname, resolve } from 'pathe'
import { defineConfig } from 'tsup'
import glob from 'fast-glob'
import { rimrafSync } from 'rimraf'
import { exports } from './package.json'

async function generateDeclareFile(sourcePath: string) {
  const name = basename(sourcePath)
  const path = dirname(sourcePath).replace(/src/, 'dist')

  const content = `export * from '${path}/${name}'\nexport { default } from '${path}/${name}'`
  await writeFile(`${name}.d.ts`, content)
}

// remove all declare files
rimrafSync(resolve(cwd(), '*.d.ts'), { glob: true })

const entrys = glob.globSync('./src/presets/*', { onlyDirectories: true })
export default defineConfig({
  splitting: false,
  dts: true,
  clean: true,
  cjsInterop: true,
  entryPoints: ['src/index.ts', ...entrys],
  format: ['cjs', 'esm'],
  onSuccess: async () => {
    await Promise.all(entrys.map(generateDeclareFile))
    // check presets if all exported
    for (const entry of entrys) {
      const name = basename(entry)
      if (!(`./${name}` in exports))
        console.warn(`[yafh] ${name} is not exported in package.json`)
    }
  },
})

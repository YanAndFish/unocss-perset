import { access, constants, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'
import type { CountableSet, Preset, UserConfig } from '@unocss/core'
import { createGenerator } from '@unocss/core'

type Input = string | string[] | Set<string> | CountableSet<string>

const outputPath = join(cwd(), 'output')

export async function generate<T extends object>(name: string, config: UserConfig<T>, input: Input) {
  const generator = createGenerator<T>(config)

  const { css } = await generator.generate(input, {
    preflights: false,
  })

  try {
    await access(outputPath, constants.F_OK)
  } catch {
    await mkdir(outputPath)
  }

  await writeFile(join(outputPath, `${name}.css`), css)
}

export async function generatePreset<T extends object>(preset: Preset<T>, input: Input) {
  await generate<T>(preset.name, {
    presets: [preset],
  }, input)
}

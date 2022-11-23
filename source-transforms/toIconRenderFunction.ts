import { readFileSync } from 'fs'
import { parse } from 'path'
import { compileTemplate } from '@vue/compiler-sfc'

export function toIconRenderFunction ({ id }) {
  const svg = readFileSync(`${id}`, { encoding: 'utf8' }),
        template = svg.replace(/svg/, 'svg aria-hidden="true" class="fill-current"'),
        filename = parse(id).name

  return compileTemplate({
    source: template,
    filename,
    id,
  }).code
}




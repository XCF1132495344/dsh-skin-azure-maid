#!/usr/bin/env node
/**
 * Build `client.js` from `src/client.template.js`, `src/skin.css` and
 * `src/theme.json`, inlining the artwork as a WebP data URI.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const art = readFileSync(join(root, 'assets/azure-maid.webp')).toString('base64')
const css = readFileSync(join(root, 'src/skin.css'), 'utf8').replaceAll('__ART__', art)
const tokens = JSON.parse(readFileSync(join(root, 'src/theme.json'), 'utf8'))
const template = readFileSync(join(root, 'src/client.template.js'), 'utf8')

const out = template
  .replace('__TOKENS__', () => JSON.stringify(tokens))
  .replace('__CSS__', () => JSON.stringify(css))

writeFileSync(join(root, 'client.js'), out)
console.log('client.js written', (out.length / 1024).toFixed(0) + 'KB')

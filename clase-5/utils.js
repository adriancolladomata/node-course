import { createRequire } from 'node:module'
// Crea un require desde la url del archivo actual donde nos encontramos
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

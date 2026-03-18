import fs from 'node:fs'

const stats = fs.statSync('../notes')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)

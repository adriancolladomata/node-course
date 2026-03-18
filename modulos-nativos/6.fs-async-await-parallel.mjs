/* eslint-disable indent */
import fs from 'node:fs/promises'

Promise.all([
  fs.readFile('./test-texts/archivo1.txt', 'utf-8'),
  fs.readFile('./test-texts/archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('Primer texto: ' + text)
  console.log('Segundo texto: ' + text2)
})

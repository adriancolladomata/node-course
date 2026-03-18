import fs from 'node:fs'

const text = fs.readFile('./test-texts/archivo1.txt', 'utf-8', (_err, text) => { // Ejecutas este callback
  console.log('Primer texto', text)
})

console.log('Leyendo el archivo por primera vez...')

console.log(text)

console.log('Haciendo algo mientras se lee el archivo')

const text2 = fs.readFile('./test-texts/archivo2.txt', 'utf-8', (_err, text) => { // Ejecutas este callback
  console.log('Segundo texto:', text)
})

console.log(text2)

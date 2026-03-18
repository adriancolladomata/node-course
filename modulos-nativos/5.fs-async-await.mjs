import fs from 'node:fs/promises'

/*
IIFE - Inmediately Involved Function Expression

(
    async () => {}
)()

*/

console.log('Leyendo el primer archivo...')
const text = await fs.readFile('./test-texts/archivo1.txt', 'utf-8')
console.log('Primer texto: ', text)

console.log('Haciendo algo mientras se lee el archivo')

console.log('Leyendo el segundo archivo...')
const text2 = await fs.readFile('./test-texts/archivo2.txt', 'utf-8')
console.log('Segundo texto: ', text2)

console.log(text2)

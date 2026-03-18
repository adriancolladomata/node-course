import path from 'node:path'

// Barra separadora de carpetas según SO.
console.log(path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Devuelve el nombre del fichero
const base = path.basename('/tmp/midu-secret-files/paswword.txt')
console.log(base)

// Devuelve el nombre del fichero sin la extension
const filename = path.basename('/tmp/midu-secret-files/paswword.txt', '.txt')
console.log(filename)

// Obtiene la extension
const extension = path.extname('image.jpg')
console.log(extension)

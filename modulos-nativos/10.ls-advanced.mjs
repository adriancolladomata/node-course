import fs from 'node:fs/promises'
import path from 'node:path'
import pc from 'picocolors'

// argv[0] es node, y argv[1] es el archivo, argv[2] por tanto es el siguiente argumento
const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder) // Sin await sería files = fs.readdir(folder).then(files => {...}). Devuelve directamente el resultado (array de archivos)
  } catch {
    console.error(pc.red(`❌ No se pudo leer el directorio: ${folder}`))
    process.exit(1)
  }

  /*
    const filesPromises = files.map(file => {
        return new Promise(resolve => {
            ...
        })
    })
    */

  const filesPromises = files.map(async file => { // map + función async ⇒ devuelve un array de Promises, NO devuelve resultados todavía
    const filePath = path.join(folder, file)
    let stats

    try {
      stats = await fs.stat(filePath) // Promise para la obtención de las stats
    } catch {
      console.error(`No se pudieron obtener las estadísticas del directorio: ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.blue(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
  })

  // Asincronía en paralelo
  const filesInfo = await Promise.all(filesPromises) // Espera a que todas terminen. Devuelve un array con los resultados

  // Imrpime cada ruta del archivo o carpeta obtenida
  filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)

/*
fs.readdir(folder)
    .then(files => {
        files.forEach(file => {
            const filePath = path.join(folder, file)

            fs.stat(filePath)
        })
    })
    .catch(err => {
        if (err) {
            console.error("Error al leer el directorio: ", err)
            return
        }
    })
*/

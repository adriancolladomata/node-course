import http from 'node:http' // Protocolo HTTP
import fs from 'node:fs'

// EN windows hay que poner en la terminal lo siguiente: $env:PORT=XXXX; node .\1.http.mjs
const desiredPort = process.env.PORT ?? 1234

// Se crea la función request aquí
const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/imagen-node.png') {
    res.setHeader('Content-Type', 'image/png')
    // Se pasa un buffer para poder lrer en binario la imagen (Leer parámetros de fs.readFile)
    fs.readFile('clase-2/images/node-image.png', (err, data) => {
      // Si hay un error muestra un 500
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server error</h1>')
        // Si el proceso es exitoso asigna el header y lee la información
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Bienvenido a mi página de contacto')
  } else {
    res.statusCode = 404 // NOT FOUND
    res.end('Error 404: NOT FOUND')
  }
}

// Se pasa como parámetro la funcion processRequest aquí
const server = http.createServer(processRequest)

// Al usar el puerto 0, te busca automáticamente un puerto que esté disponible
server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

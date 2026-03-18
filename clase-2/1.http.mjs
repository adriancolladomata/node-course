import http from 'node:http' // Protocolo HTTP

// EN windows hay que poner en la terminal lo siguiente: $env:PORT=XXXX; node .\1.http.mjs
const desiredPort = process.env.PORT ?? 1234

// Se crea la función request aquí
const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === 'imagen-super-bonita.png') {
    res.setHeader('Content-Type', 'image/png')
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

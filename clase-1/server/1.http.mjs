import http from 'node:http' // Protocolo HTTP
import { findAvailablePort } from './2.free-port.mjs'

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
  // Al usar el puerto 0, te busca automáticamente un puerto que esté disponible
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})

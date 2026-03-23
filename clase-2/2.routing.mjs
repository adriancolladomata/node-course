import http from 'node:http'
import { pokemonDitto } from './pokemon-ditto.js'

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          return res.end(JSON.stringify(pokemonDitto))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf8')
          return res.end('<h1>Error 404: NOT FOUND</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data (chunk es un Buffer)
          // req.on contiene: data (manejo de datos), end (finalización), error (manejo de errores) o close (cancelación de maner asíncrona)
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // Llamar a la base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf8' })
            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.stausCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Error 404: NOT FOUND</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server listening on port http.//localhost:1234')
})

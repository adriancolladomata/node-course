import express from 'express'
import { pokemonDitto } from './pokemon-ditto.js'

const app = express()

// Desactiva el X-Powered-By del header del request
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

// Next es el middleware. Cuando terminemos de hacer la función
app.use((req, res, next) => {
  console.log('Mi primer middleware')
  // Trackear la request a la base de datos
  // Revisar si el usuario tiene cookies
  next() // MUY IMPORTANTE para que la request no se quede colgada
})

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  let body = ''
  // Escuchar el evento data (chunk es un Buffer)
  // req.on contiene: data (manejo de datos), end (finalización), error (manejo de errores) o close (cancelación de maner asíncrona)
  req.on('data', chunk => {
    body += chunk.toString() // Añade al body, que es la informacion que se envia, los chunks de información (Dispon ibles en api.http)
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // Mutar la request y meter la información en el req.body
    req.body = data
    next()
  })
})

// Todo lo anteriormente hecho es lo mismo que usar
// ------> !!!! app.use(express.json())

// Cada vez que reciba un get en la ruta / entonces ejecuta esta funcion:
app.get('/pokemon/ditto', (req, res) => {
  res.json(pokemonDitto)
  // Se puede omitir el status res.send('<h1>Mi página</h1>')
  // Se puede insertar JSON directamente res.json({ message: "Hola mundo" })
})

app.post('/pokemon', (req, res) => {
  // Asigna el status a 201 (Created) y envía el body del request, que contiene los datos introducidos y tratados en el middleware
  // req.body deberiamos guardarlo en la base de datos
  res.status(201).send(req.body)
})

// Recoge el error 404 NOT FOUND
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})

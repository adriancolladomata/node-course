import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// Manera de importar un archivo JSON con EcmaScript Modules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

const app = express()
// Para que funcionalidades como la asignación del body a los valores json en el post, tenemos que recurrir al middleware dado en el archivo 3.express.js de clase-2
app.use(json())
app.use(corsMiddleware())

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

// Cuando se obtenga la url /movies, cogerá el archivo movies.js con moviesRouter y hará la función de la ruta que coincida
app.use('/movies', moviesRouter)

// Puerto
const PORT = process.env.PORT ?? 1234

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`)
})

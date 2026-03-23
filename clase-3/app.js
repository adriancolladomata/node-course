const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('movies.js')

const app = express()
// Para que funcionalidades como la asignación del body a los valores json en el post, tenemos que recurrir al middleware dado en el archvio 3.express.js de clase-2
app.use(express.json())
/* Usando esta funcion de express, podemos hacer lo mismo que todo lo realizado anteriormente para combatir y controlar el CORS
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://localhost:8080',
    'http://localhost:8080'
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
*/

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

// ORIGINS (URLS CLIENTE) a los que se le proporciona el header para evitar el CROS
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:8080',
  'http://localhost:8080'
]

// Todos los recursos que sean de MOVIES se identifica con /movies
// Endpoint de movies
app.get('/movies', (req, res) => {
  // Filtra el origen, si el origen dado (url) está entre los origins aceptados, se permite la visualización de la página
  // Cuando la petición es del mismo ORIGIN, el navegador no envía la cabecera ORIGIN | http://Localhost:1234 -> http://Localhost:1234
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  // Query es una propiedad de req que te ayuda a conseguir directamente los paramatros de la url
  const { genre } = req.query
  if (genre) {
    // En movies.json, genre viene dado en un array, por lo que se usan metodos de array para filtrar
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found ' })
})

app.post('/movies', (req, res) => {
  // Valida el body (data) de la request, y si no es válido, devuelve un error 400 con un mensaje de error que indica el motivo del error.
  const result = validateMovie(req.body)

  if (result.error) {
    // Error 400: Bad Request, el cliente ha enviado una petición con un body que no cumple con el schema definido,
    // por lo que se devuelve un error 400 con un mensaje de error que indica el motivo del error.
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    // Generar un id único para cada película usando crypto.randomUUID(), que es una función que genera un UUID (Universally Unique Identifier) de forma aleatoria.
    id: crypto.randomUUID(),
    // Si hemos hecho bien la validación en el schema, podemos usar ..result.data, si no, tendríamos que usar ..req.body,
    // pero esto no es recomendable porque no tenemos la seguridad de que el body sea correcto, y podríamos tener errores en la aplicación, o inyección de código.
    ...result.data
  }
  // Esto no sería REST por que estamos guardando el estado de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // Devuelves el recurso y actualizas la caché del cliente
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  // Valida el body (data) de la request, y si no es válido, devuelve un error 400 con un mensaje de error que indica el motivo del error.
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // Encuentra el la pelicula medainte la id y asigna el valor del índice a una variable, para luego usarla para actualizar la película con los datos del body de la request.
  const movieIndex = movies.findIndex(movie => movie.id === id)

  // Si el índice es -1 es por que la pelicula no existe
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  // La pelicula se actualiza con ...movies[movieIndex] (Todo lo que ya tiene la pelicula original) y ...result.data (Todo lo que se ha actualizado de la pelicula).
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})

// Ponemos el options como middleware ante los métodos "complejos" (apuntados en notas) para que funcione

app.options('/movies/:id', (req, res) => {
  const origin = req.headers.origin
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  // Envía una respuesta
  res.send(200)
})

// Puerto
const PORT = process.env.PORT ?? 1234

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`)
})

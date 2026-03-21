const express = require('express')
const movies = require('./movies.json')

const app = express()

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

// Todos los recursos que sean de MOVIES se identifica con /movies
// Endpoint de movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // Path-to-regexp (Se puede usar regexp)- Investigar
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Puerto
const PORT = process.env.PORT ?? 1234

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`)
})

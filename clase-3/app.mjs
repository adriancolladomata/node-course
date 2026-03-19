import express from 'express'

const app = express()
app.disabled('x-powered-by') // Deshabilitar el header X-Powered-By

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`)
})

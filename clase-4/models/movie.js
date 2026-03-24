import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'

// Se llama al archivo teniendo en cuenta la rferencia del archivo utils.js
const movies = readJSON('./movies.json')

// Al hacerlo asíncrono, podemos simular que estamos haciendo una consulta a una base de datos, y en un futuro podríamos cambiar la
// implementación para que haga una consulta a una base de datos real sin tener que cambiar el código de los controllers o routes.

// Si lo hacemos síncrono, tendríamos que cargar todos los datos en memoria cada vez que se hace una consulta, lo cual no es eficiente,
// y además, si tenemos muchos datos, podríamos tener problemas de rendimiento o incluso de memoria.

// En los parámetros usamos objetos por que son más fáciles de extender

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(movie => movie.genre.som(g => g.toLowerCase() === genre.toLowerCase()))
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) {
      return false
    }

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}

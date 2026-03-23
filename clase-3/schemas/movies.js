// Para validar el body de la petición, se puede usar zod, que es una librería de validación de datos.
// Se puede usar para validar el body de la petición, y si no es válido, se puede devolver un error 400.
const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required.'
  }),
  year: z.number().int().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Thriller', 'Fantasy', 'Comedy', 'Crime', 'Drama', 'Horror', 'Sci-Fi', 'Romance']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (object) {
  // safeParse devuelve un objeto con la propiedad success, que es un booleano que indica si la validación fue exitosa o no,
  // y la propiedad data, que contiene los datos validados si la validación fue exitosa, o los errores de validación si no lo fue.
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  // Todas las proiedades del schema se vuelven opcionales, pero si hay alguna, se valida de manera normal,
  // por lo que se puede usar para validar el body de una petición PATCH, donde solo se actualizan algunas propiedades de la película.
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}

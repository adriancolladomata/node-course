import net from 'node:net'

// Esta función busca un puerto disponible en caso de que un puerto se encuentre ocupado

export function findAvailablePort (desiredPort) {
  // Crea una promesa
  return new Promise((resolve, reject) => {
    // Crea el servidor
    const server = net.createServer()

    // Declara donde escucha el puerto y un callback
    server.listen(desiredPort, () => {
      // Instanciacion del puerto
      const { port } = server.address()
      // Cierra el servidor cuando se haya resuelto la promise
      server.close(() => {
        resolve(port)
      })
    })

    // Cuando ocurra el evento (primer parametro) ejecuta el callback (segundo parametro). Algunos eventos son: connection, request, close, error...
    server.on('error', (err) => {
      // Si el puerto esta en uso, asigna el puerto 0, que buscará un puerto disponible aleatorio y cierra la promise
      if (err === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        // Lanza el error
        reject(err)
      }
    })
  })
}

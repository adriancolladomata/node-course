// Argumentos de entrada de la terminal
console.log(process.argv);

// Controlar el proceso y su salida

// process.exit(0); // Todo ha ido bien y el proceso termina ahi

// process.exit(1); // Ha habido algun error y queremos que el proceso se detenga ahi

// process.on('exit', () => {
//     // Limpiar los recursos

// });

// Current workind directory
console.log(process.cwd());

// Platform
console.log(process.env.PEPITO) // PEPITO=hola node 9.process.mjs
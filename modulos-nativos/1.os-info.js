const os = require('node:os');

console.log("Información del Sistema Operativo: ");
console.log("------------------")

console.log('Nombre del S0: ' + os.platform);
console.log('Versión del S0: ' + os.release);
console.log('Arquitectura del S0: ' +  os.arch);
console.log('Uptime del S0: ' + os.arch);
import fs from 'node:fs';

// argv[0] es node, y argv[1] es el archivo, argv[2] por tanto es el siguiente argumento
const folder = process.argv[2] ?? '.';

fs.readdir(folder, (err, files) => {
    if (err) {
        console.error('Error al leer el directorio: ', err);
        return;
    };

    files.forEach(file => {
        console.log(file);
    });
});
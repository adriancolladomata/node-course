import path from 'node:path';

// Barra separadora de carpetas según SO.
console.log(path.sep);

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);
    // Cont
import dotenv from 'dotenv';
dotenv.config(); // Carga las variables de .env a process.env

import app from './app';
import { environment } from './config'; // Importar config

const PORT = environment.port; // Usar config

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    console.log(`   Ambiente: ${environment.nodeEnv}`); // Usar config
    console.log(`   Presiona CTRL+C para detener\n`);
}); 
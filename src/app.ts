import express, { Application, Request, Response } from 'express';
import apiV1Routes from './api/v1/routes'; // Importamos el enrutador principal v1
import { requestLogger } from './middlewares'; // Importar middleware

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        // Middlewares esenciales
        this.app.use(express.json()); // Para parsear JSON bodies
        this.app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded bodies

        // Middlewares personalizados (ej: logging)
        this.app.use(requestLogger);
    }

    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('¡Hola Mundo desde la App!');
        });

        // Usamos el enrutador de la API v1 con su prefijo
        this.app.use('/api/v1', apiV1Routes);
    }
}

export default new App().app; 
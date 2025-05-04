import { Request, Response } from 'express';

class ExampleController {
    public getExample(req: Request, res: Response): void {
        res.status(200).json({ message: 'Esta es una respuesta de ejemplo desde la API v1' });
    }

    // Aquí podrías añadir más métodos para POST, PUT, DELETE, etc.
}

export default new ExampleController(); 
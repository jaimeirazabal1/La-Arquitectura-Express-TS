import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Opcional: Loguear headers o body (¡cuidado con datos sensibles!)
    // console.log('Headers:', req.headers);
    // if (req.body && Object.keys(req.body).length > 0) {
    //     console.log('Body:', req.body);
    // }
    next(); // Pasa al siguiente middleware o controlador
};

export default requestLogger; 
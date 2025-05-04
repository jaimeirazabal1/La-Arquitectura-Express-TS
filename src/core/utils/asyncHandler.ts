import { Request, Response, NextFunction } from 'express';

// Tipo para una función de controlador Express
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * Envuelve una función de controlador asíncrona para capturar errores
 * y pasarlos al siguiente middleware (manejador de errores).
 */
const asyncHandler = (fn: AsyncController) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler; 
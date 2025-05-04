import { Request, Response } from 'express';
import { asyncHandler } from '../../core'; // Usamos nuestro asyncHandler

// Simulación de un servicio (en un caso real, interactuaría con la DB)
const userService = {
    getAll: async () => Promise.resolve([{ id: 1, name: 'Usuario Ejemplo' }]),
    getById: async (id: string) => Promise.resolve({ id: parseInt(id, 10), name: 'Usuario Ejemplo ' + id }),
};

class UserController {
    // Usamos asyncHandler para no necesitar try/catch aquí
    public getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAll();
        res.status(200).json(users);
    });

    public getUserById = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.getById(req.params.id);
        if (!user) {
            // Podríamos lanzar un ApiError aquí si tuviéramos manejo de errores
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    });
}

export default new UserController(); 
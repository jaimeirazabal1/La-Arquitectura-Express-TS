import { Router } from 'express';
import UserController from './users.controller';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

// Aquí irían rutas POST, PUT, DELETE para usuarios

export default router; 
import { Router } from 'express';
import exampleRoutes from './example.routes';
import userRoutes from '../../../modules/users/users.routes';

const router = Router();

// Montamos las rutas de ejemplo bajo el prefijo /example
router.use('/example', exampleRoutes);

// Montamos las rutas de usuarios bajo el prefijo /users
router.use('/users', userRoutes);

// Aquí montarías otras rutas de la v1
// router.use('/products', productRoutes);

export default router; 
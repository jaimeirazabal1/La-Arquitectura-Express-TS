import { Router } from 'express';
import ExampleController from '../controllers/example.controller';

const router = Router();

// Definimos la ruta GET /api/v1/example
router.get('/', ExampleController.getExample);

// Aquí podrías añadir más rutas (POST, PUT, DELETE) para este módulo

export default router; 
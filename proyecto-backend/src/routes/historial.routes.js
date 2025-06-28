import { Router } from 'express';
import {crearHistorial,listarHistorialPorMascota} from '../controllers/historial.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

// Registrar historial (ruta protegida)
router.post('/', validarToken, crearHistorial);

// Listar historial por mascota del usuario autenticado
router.get('/:id', validarToken, listarHistorialPorMascota);

export default router;

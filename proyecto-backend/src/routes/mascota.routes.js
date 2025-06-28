import { Router } from 'express';
import { crearMascota, listarMascotas } from '../controllers/mascota.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

// Todas las rutas protegidas con token
router.post('/', validarToken, crearMascota);
router.get('/', validarToken, listarMascotas);

export default router;

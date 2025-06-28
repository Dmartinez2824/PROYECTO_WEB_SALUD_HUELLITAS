import { Router } from 'express';
import { crearCita, listarCitas } from '../controllers/cita.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

router.post('/', validarToken, crearCita);
router.get('/', validarToken, listarCitas);

export default router;

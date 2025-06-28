import { Router } from 'express';
import {listarServicios,agregarServicio} from '../controllers/servicio.controller.js';

import { validarToken } from '../middleware/validarToken.js';

const router = Router();

// Obtener todos los servicios (público o protegido según tu criterio)
router.get('/', listarServicios);

// Crear servicio (protegido con token, opcionalmente verifica si es admin)
router.post('/', validarToken, agregarServicio);

export default router;

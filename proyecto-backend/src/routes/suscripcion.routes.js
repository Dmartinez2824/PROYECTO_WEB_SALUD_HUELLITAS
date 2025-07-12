import { Router } from 'express';
import { crearSuscripcion, crearSuscripcionFamiliar, obtenerSuscripciones } from '../controllers/suscripcion.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

router.post('/', validarToken, crearSuscripcion);
router.get('/', validarToken, obtenerSuscripciones);
router.post('/familiar', validarToken, crearSuscripcionFamiliar);


export default router;

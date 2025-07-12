import { Router } from 'express';
import {
  obtenerConteoUsuarios,
  obtenerConteoMascotas,
  obtenerConteoSuscripciones
} from '../controllers/admin.controller.js';
import { validarToken } from '../middleware/validarToken.js';
import { listarMascotasAdmin, inactivarMascota,reactivarMascota,listarCitasAdmin, cambiarEstadoCita } from '../controllers/admin.controller.js';






const router = Router();

router.get('/usuarios/conteo', validarToken, obtenerConteoUsuarios);
router.get('/mascotas/conteo', validarToken, obtenerConteoMascotas);
router.get('/suscripciones/conteo', validarToken, obtenerConteoSuscripciones);
router.patch('/mascotas/:id/inactivar', validarToken, inactivarMascota);
router.get('/mascotas', validarToken, listarMascotasAdmin);
router.patch('/mascotas/:id/reactivar', validarToken, reactivarMascota);
router.get('/citas', validarToken, listarCitasAdmin);
router.patch('/citas/:id/estado', validarToken, cambiarEstadoCita);

export default router;

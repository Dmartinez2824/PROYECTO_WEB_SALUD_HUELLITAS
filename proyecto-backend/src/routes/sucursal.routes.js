import { Router } from 'express';
import { listarSucursales } from '../controllers/sucursal.controller.js';

const router = Router();

router.get('/', listarSucursales);

export default router;

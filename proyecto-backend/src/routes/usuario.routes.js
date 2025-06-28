import { Router } from 'express';
import {registrarUsuario,loginUsuario,renovarToken} from '../controllers/usuario.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/refresh', renovarToken);

// Ruta protegida de prueba
router.get('/privada', validarToken, (req, res) => {
  res.json({ mensaje: 'Acceso concedido', usuario: req.usuario });
});

export default router;

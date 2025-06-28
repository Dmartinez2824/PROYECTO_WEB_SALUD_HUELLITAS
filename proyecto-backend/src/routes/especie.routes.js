import { Router } from 'express';
import connection from '../utils/db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM especies');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener especies', error: error.message });
  }
});

export default router;

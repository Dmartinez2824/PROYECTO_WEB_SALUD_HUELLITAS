import {
  registrarHistorial,
  obtenerHistorialPorMascota
} from '../models/historial.model.js';

// Registrar historial clínico de una cita
export const crearHistorial = async (req, res) => {
  try {
    const { cita_id, observaciones, tratamiento } = req.body;

    if (!cita_id || !observaciones || !tratamiento) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const resultado = await registrarHistorial(cita_id, observaciones, tratamiento);

    res.status(201).json({
      mensaje: 'Historial registrado correctamente',
      idInsertado: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar historial',
      error: error.message
    });
  }
};

// Consultar historial clínico de una mascota del usuario logueado
export const listarHistorialPorMascota = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const mascota_id = req.params.id;

    const historial = await obtenerHistorialPorMascota(usuario_id, mascota_id);

    res.json(historial);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener historial',
      error: error.message
    });
  }
};

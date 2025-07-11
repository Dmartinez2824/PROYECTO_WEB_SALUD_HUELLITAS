import {registrarCita,citaExistente,obtenerCitasPorUsuario} from '../models/cita.model.js';


// Registrar una nueva cita
export const crearCita = async (req, res) => {
  try {
const { mascota_id, sucursal_id, fecha, hora, servicio_id } = req.body;

    if (!mascota_id || !sucursal_id || !fecha || !hora) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Validar si ya existe una cita duplicada
    const yaExiste = await citaExistente(mascota_id, fecha, hora);
    if (yaExiste) {
    return res.status(409).json({
    mensaje: 'Ya existe una cita para esa mascota en la misma fecha y hora'
  });
}



    const resultado = await registrarCita(mascota_id, sucursal_id, fecha, hora, servicio_id);
res.status(201).json({
  mensaje: 'Cita registrada correctamente',
  idInsertado: resultado.insertId
});
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar la cita',
      error: error.message
    });
  }
};


// Consultar citas del usuario autenticado
export const listarCitas = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const citas = await obtenerCitasPorUsuario(usuario_id);
    res.json(citas);
  } catch (error) {
    console.error('❌ Error en listarCitas:', error); // <- AÑADE ESTO
    res.status(500).json({
      mensaje: 'Error al obtener citas',
      error: error.message
    });
  }
};


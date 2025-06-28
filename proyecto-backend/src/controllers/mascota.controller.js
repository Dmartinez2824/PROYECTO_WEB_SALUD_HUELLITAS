import { registrarMascota, obtenerMascotasPorUsuario } from '../models/mascota.model.js';

// Registrar nueva mascota
export const crearMascota = async (req, res) => {
  try {
    const { nombre, especie_id } = req.body;
    const usuario_id = req.usuario.id; // viene del token

    if (!nombre || !especie_id) {
      return res.status(400).json({ mensaje: 'Nombre y especie son obligatorios' });
    }

    const resultado = await registrarMascota(nombre, especie_id, usuario_id);
    res.status(201).json({
      mensaje: 'Mascota registrada correctamente',
      idInsertado: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar mascota', error: error.message });
  }
};

// Obtener mascotas del usuario autenticado
export const listarMascotas = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const mascotas = await obtenerMascotasPorUsuario(usuario_id);
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error: error.message });
  }
};

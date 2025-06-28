import { obtenerServicios, crearServicios } from '../models/servicio.model.js';

// Obtener todos los servicios
export const listarServicios = async (req, res) => {
  try {
    const servicios = await obtenerServicios();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los servicios',
      error: error.message
    });
  }
};

// Crear un nuevo servicio
export const agregarServicio = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre del servicio es obligatorio' });
    }

    const resultado = await crearServicios(nombre);
    res.status(201).json({
      mensaje: 'Servicio creado correctamente',
      idInsertado: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el servicio',
      error: error.message
    });
  }
};

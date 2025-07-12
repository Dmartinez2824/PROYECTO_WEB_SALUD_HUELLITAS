import {
  contarUsuarios,
  contarMascotas,
  contarSuscripciones,
  obtenerMascotasConInfo
} from '../models/admin.model.js';
import { desactivarMascota, activarMascota,obtenerCitasConInfo, actualizarEstadoCita  } from '../models/admin.model.js';

export const listarCitasAdmin = async (req, res) => {
  try {
    const citas = await obtenerCitasConInfo();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener citas', error: error.message });
  }
};

export const cambiarEstadoCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    console.log('➡️ Cambio de estado recibido:', { id, estado });

    if (!['pendiente', 'aceptada', 'rechazada'].includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    const resultado = await actualizarEstadoCita(id, estado);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    res.json({ mensaje: `Cita actualizada a estado: ${estado}` });
  } catch (error) {
    console.error('❌ Error al cambiar estado:', error);
    res.status(500).json({ mensaje: 'Error al cambiar estado', error: error.message });
  }
};



export const reactivarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await activarMascota(id);
    
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json({ mensaje: 'Mascota reactivada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al reactivar mascota', error: error.message });
  }
};

export const inactivarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await desactivarMascota(id);
    
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    }

    res.json({ mensaje: 'Mascota desactivada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al desactivar mascota', error: error.message });
  }
};

export const obtenerConteoUsuarios = async (req, res) => {
  try {
    const total = await contarUsuarios();
    res.json(total);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al contar usuarios', error: error.message });
  }
};


export const obtenerConteoMascotas = async (req, res) => {
  try {
    const total = await contarMascotas();
    res.json(total);
  } catch (error) {
    console.error('❌ ERROR en obtenerConteoMascotas:', error); 
    res.status(500).json({ mensaje: 'Error al contar mascotas', error: error.message });
  }
};


export const obtenerConteoSuscripciones = async (req, res) => {
  try {
    const total = await contarSuscripciones();
    res.json(total);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al contar suscripciones', error: error.message });
  }
};

export const listarMascotasAdmin = async (req, res) => {
  try {
    const datos = await obtenerMascotasConInfo();
    res.json(datos);
  } catch (error) {
    console.error('❌ Error en listarMascotasAdmin:', error);
    res.status(500).json({ mensaje: 'Error al obtener mascotas', error: error.message });
  }
};

import {
  registrarSuscripcion,
  suscripcionesPorUsuario,
  contarMascotasDelUsuario
} from '../models/suscripcion.model.js';

export const crearSuscripcion = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { direccion, telefono, plan, mascota_id } = req.body;

    if (!direccion || !telefono || !plan) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const fecha_inicio = new Date().toISOString().split('T')[0];

    if (plan === 'Plan Básico' || plan === 'Plan Premium') {
      if (!mascota_id) {
        return res.status(400).json({ mensaje: 'Debe seleccionar una mascota para este plan' });
      }

      const yaExiste = await suscripcionesPorUsuario(usuario_id, mascota_id);
      if (yaExiste.length > 0) {
        return res.status(409).json({ mensaje: 'La mascota ya tiene una suscripción activa' });
      }

      const resultado = await registrarSuscripcion({
        direccion, telefono, plan, mascota_id, usuario_id, fecha_inicio
      });

      return res.status(201).json({ mensaje: 'Suscripción individual creada', id: resultado.insertId });
    }

    if (plan === 'Plan Familiar') {
      const totalMascotas = await contarMascotasDelUsuario(usuario_id);
      if (totalMascotas < 5) {
        return res.status(400).json({ mensaje: 'Debes tener al menos 5 mascotas registradas para este plan' });
      }

      const resultado = await registrarSuscripcion({
        direccion, telefono, plan, mascota_id: null, usuario_id, fecha_inicio
      });

      return res.status(201).json({ mensaje: 'Suscripción familiar creada', id: resultado.insertId });
    }

    return res.status(400).json({ mensaje: 'Plan no reconocido' });
  } catch (err) {
    console.error('Error en crearSuscripcion:', err);
    res.status(500).json({ mensaje: 'Error al registrar suscripción', error: err.message });
  }
};

export const obtenerSuscripciones = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const suscripciones = await suscripcionesPorUsuario(usuario_id);
    res.json(suscripciones);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener suscripciones', error: err.message });
  }
};

export const crearSuscripcionFamiliar = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { direccion, telefono, plan, mascotas } = req.body;

    if (!direccion || !telefono || !plan || !Array.isArray(mascotas) || mascotas.length === 0) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const fecha_inicio = new Date().toISOString().split('T')[0];
    const errores = [];

    for (const mascota_id of mascotas) {
      const yaExiste = await suscripcionesPorUsuario(usuario_id, mascota_id);
      if (yaExiste.length > 0) {
        errores.push(mascota_id);
        continue;
      }

      await registrarSuscripcion({
        direccion,
        telefono,
        plan,
        mascota_id,
        usuario_id,
        fecha_inicio
      });
    }

    if (errores.length === 0) {
      res.status(201).json({ mensaje: 'Todas las mascotas fueron suscritas con éxito' });
    } else {
      res.status(207).json({ mensaje: 'Algunas mascotas ya estaban suscritas', mascotas_con_error: errores });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error en suscripción familiar', error: err.message });
  }
};


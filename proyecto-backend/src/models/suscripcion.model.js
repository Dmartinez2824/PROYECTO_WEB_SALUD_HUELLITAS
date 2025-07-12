import connection from '../utils/db.js';

// 🔍 Verificar si una mascota ya está suscrita
export const verificarSuscripcionExistente = async (mascota_id) => {
  const query = `SELECT COUNT(*) AS total FROM suscripciones WHERE mascota_id = ?`;
  const [rows] = await connection.query(query, [mascota_id]);
  return rows[0].total > 0;
};

// ✅ NUEVO: Contar mascotas del usuario
export const contarMascotasDelUsuario = async (usuario_id) => {
  const query = `SELECT COUNT(*) AS total FROM mascotas WHERE usuario_id = ?`;
  const [rows] = await connection.query(query, [usuario_id]);
  return rows[0].total;
};

export const registrarSuscripcion = async ({ direccion, telefono, plan, mascota_id, usuario_id, fecha_inicio }) => {
  const query = `
    INSERT INTO suscripciones (direccion, telefono, plan, mascota_id, usuario_id, fecha_inicio)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [resultado] = await connection.query(query, [direccion, telefono, plan, mascota_id, usuario_id, fecha_inicio]);
  return resultado;
};

export const suscripcionesPorUsuario = async (usuario_id, mascota_id = null) => {
  const query = mascota_id
    ? `SELECT * FROM suscripciones WHERE usuario_id = ? AND mascota_id = ?`
    : `SELECT * FROM suscripciones WHERE usuario_id = ?`;

  const params = mascota_id ? [usuario_id, mascota_id] : [usuario_id];
  const [rows] = await connection.query(query, params);
  return rows;
};

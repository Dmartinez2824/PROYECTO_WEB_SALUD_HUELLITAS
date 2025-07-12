import connection from '../utils/db.js';
export const obtenerCitasConInfo = async () => {
  const [rows] = await connection.query(`
    SELECT 
      c.id AS id_cita,
      m.nombre AS nombre_mascota,
      u.nombre AS nombre_duenio,
      c.fecha,
      c.hora,
      c.motivo,
      c.estado
    FROM citas c
    JOIN mascotas m ON c.mascota_id = m.id
    JOIN usuarios u ON m.usuario_id = u.id
    ORDER BY c.fecha ASC, c.hora ASC
  `);
  return rows;
};



export const actualizarEstadoCita = async (id, nuevoEstado) => {
  const query = `UPDATE citas SET estado = ? WHERE id = ?`;
  const [result] = await connection.query(query, [nuevoEstado, id]);
  return result;
};

export const activarMascota = async (id) => {
  const query = `UPDATE mascotas SET activo = 1 WHERE id = ?`;
  const [result] = await connection.query(query, [id]);
  return result;
};

export const obtenerMascotasConInfo = async () => {
  const [rows] = await connection.query(`
    SELECT 
      m.id AS id_mascota,
      m.nombre AS nombre_mascota,
      u.nombre AS nombre_duenio,
      u.correo,
      IF(s.id IS NOT NULL, s.plan, 'Sin suscripción') AS plan_suscripcion,
      m.activo
    FROM mascotas m
    JOIN usuarios u ON m.usuario_id = u.id
    LEFT JOIN suscripciones s ON m.id = s.mascota_id
  `);
  return rows;
};


export const contarUsuarios = async () => {
  const [rows] = await connection.query(`SELECT COUNT(*) AS total FROM usuarios WHERE activo = 1`);
  return rows[0];
};

export const contarMascotas = async () => {
  const [rows] = await connection.query(`
    SELECT COUNT(*) AS total FROM mascotas WHERE activo = 1
  `);
  return rows[0];
};

export const contarSuscripciones = async () => {
  const [rows] = await connection.query(`SELECT COUNT(*) AS total FROM suscripciones`);
  return rows[0];
};

export const desactivarMascota = async (mascotaId) => {
  const query = `UPDATE mascotas SET activo = 0 WHERE id = ?`;
  const [result] = await connection.query(query, [mascotaId]);
  return result;
};



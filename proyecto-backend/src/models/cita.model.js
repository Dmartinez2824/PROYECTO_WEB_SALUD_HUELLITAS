import connection from '../utils/db.js';

// Registrar una nueva cita
export const obtenerCitasPorUsuario = async (usuario_id) => {
  const query = `
    SELECT c.id, m.nombre AS mascota, s.nombre AS sucursal, c.fecha, c.hora
    FROM citas c
    JOIN mascotas m ON c.mascota_id = m.id
    JOIN sucursales s ON c.sucursal_id = s.id
    WHERE m.usuario_id = ?
    ORDER BY c.fecha DESC, c.hora ASC
  `;
  const [rows] = await connection.query(query, [usuario_id]);
  return rows;
};

export const registrarCita = async (mascota_id, sucursal_id, fecha, hora) => {
  const query = `
    INSERT INTO citas (mascota_id, sucursal_id, fecha, hora)
    VALUES (?, ?, ?, ?)
  `;
  const [resultado] = await connection.query(query, [mascota_id, sucursal_id, fecha, hora]);
  return resultado;
};


// Obtener citas del usuario autenticado (por sus mascotas)
export const obtenerTodasLasCitas = async () => {
  const query = `
    SELECT c.id, m.nombre AS mascota, s.nombre AS sucursal, c.fecha, c.hora
    FROM citas c
    JOIN mascotas m ON c.mascota_id = m.id
    JOIN sucursales s ON c.sucursal_id = s.id
    ORDER BY c.fecha DESC, c.hora ASC
  `;
  const [rows] = await connection.query(query);
  return rows;
};


// Verificar si ya existe una cita en esa fecha y hora para esa mascota
export const citaExistente = async (mascota_id, fecha, hora) => {
  const query = `
    SELECT * FROM citas
    WHERE mascota_id = ? AND fecha = ? AND hora = ?
  `;
  const [rows] = await connection.query(query, [mascota_id, fecha, hora]);
  return rows.length > 0;
};


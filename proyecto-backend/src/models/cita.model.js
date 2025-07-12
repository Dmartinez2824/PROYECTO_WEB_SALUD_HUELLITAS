import connection from '../utils/db.js';

// Registrar una nueva cita
export const obtenerCitasPorUsuario = async (usuario_id) => {
  const query = `
SELECT c.id, c.fecha, c.hora, c.estado, m.nombre AS mascota, s.nombre AS sucursal, v.nombre AS servicio
FROM citas c
JOIN mascotas m ON c.mascota_id = m.id
JOIN sucursales s ON c.sucursal_id = s.id
LEFT JOIN cita_servicio cs ON cs.cita_id = c.id
LEFT JOIN servicios v ON cs.servicio_id = v.id
WHERE m.usuario_id = ?
ORDER BY c.fecha DESC, c.hora ASC;`;
  const [rows] = await connection.query(query, [usuario_id]);
  return rows;
};


export const registrarCita = async (mascota_id, sucursal_id, fecha, hora, servicio_id) => {
  const query1 = `
    INSERT INTO citas (mascota_id, sucursal_id, fecha, hora)
    VALUES (?, ?, ?, ?)
  `;

  const [citaResult] = await connection.query(query1, [mascota_id, sucursal_id, fecha, hora]);
  const cita_id = citaResult.insertId;

  const query2 = `
    INSERT INTO cita_servicio (cita_id, servicio_id)
    VALUES (?, ?)
  `;

  await connection.query(query2, [cita_id, servicio_id]);

  return { insertId: cita_id };
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


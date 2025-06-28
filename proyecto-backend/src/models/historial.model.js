import connection from '../utils/db.js';

// Registrar historial clínico de una cita
export const registrarHistorial = async (cita_id, observaciones, tratamiento) => {
  const query = `
    INSERT INTO historial_citas (cita_id, observaciones, tratamiento)
    VALUES (?, ?, ?)
  `;
  const [resultado] = await connection.query(query, [cita_id, observaciones, tratamiento]);
  return resultado;
};

// Consultar historial clínico de una mascota (usando citas)
export const obtenerHistorialPorMascota = async (usuario_id, mascota_id) => {
  const query = `
    SELECT h.id, c.fecha, c.hora, h.observaciones, h.tratamiento
    FROM historial_citas h
    JOIN citas c ON h.cita_id = c.id
    JOIN mascotas m ON c.mascota_id = m.id
    WHERE m.usuario_id = ? AND m.id = ?
    ORDER BY c.fecha DESC, c.hora DESC
  `;
  const [rows] = await connection.query(query, [usuario_id, mascota_id]);
  return rows;
};

import connection from '../utils/db.js';

// Insertar nueva mascota
export const registrarMascota = async (nombre, especie_id, usuario_id) => {
  const query = `
    INSERT INTO mascotas (nombre, especie_id, usuario_id)
    VALUES (?, ?, ?)
  `;
  const [resultado] = await connection.query(query, [nombre, especie_id, usuario_id]);
  return resultado;
};

// Listar mascotas de un usuario
export const obtenerMascotasPorUsuario = async (usuario_id) => {
  const query = `
    SELECT m.id, m.nombre, e.nombre AS especie
    FROM mascotas m
    JOIN especies e ON m.especie_id = e.id
    WHERE m.usuario_id = ?
  `;
  const [rows] = await connection.query(query, [usuario_id]);
  return rows;
};

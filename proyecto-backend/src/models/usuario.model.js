
import connection from '../utils/db.js';

// Crear usuario
export const crearUsuario = async (nombre, correo, contrasenaHash, rol_id) => {
  const query = `
    INSERT INTO usuarios (nombre, correo, contrasena, rol_id)
    VALUES (?, ?, ?, ?)
  `;
  const [resultado] = await connection.query(query, [nombre, correo, contrasenaHash, rol_id]);
  return resultado;
};

// Buscar usuario por correo (usado en login)
export const buscarUsuarioPorCorreo = async (correo) => {
  const query = `SELECT * FROM usuarios WHERE correo = ?`;
  const [rows] = await connection.execute(query, [correo]);
  return rows[0]; // Devuelve el primer usuario encontrado
};


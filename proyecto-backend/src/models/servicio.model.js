import connection from '../utils/db.js';

// Obtener todos los servicios disponibles
export const obtenerServicios = async () => {
  const query = `SELECT * FROM servicios`;
  const [resultado] = await connection.query(query);
  return resultado;
};

// Crear un nuevo servicio
export const crearServicios = async (nombre) => {
  const query = `INSERT INTO servicios (nombre) VALUES (?)`;
  const [resultado] = await connection.query(query, [nombre]);
  return resultado;
};

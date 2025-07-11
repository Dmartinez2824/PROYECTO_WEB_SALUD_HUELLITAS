import connection from '../utils/db.js';

export const obtenerSucursales = async () => {
  const query = 'SELECT * FROM sucursales';
  const [rows] = await connection.query(query);
  return rows;
};

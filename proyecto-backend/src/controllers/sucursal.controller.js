import { obtenerSucursales } from '../models/sucursal.model.js';

export const listarSucursales = async (req, res) => {
  try {
    const sucursales = await obtenerSucursales();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener sucursales',
      error: error.message
    });
  }
};

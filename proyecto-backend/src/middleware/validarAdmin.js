export const validarAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol_id !== 1) {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo administradores' });
  }
  next();
};

import jwt from 'jsonwebtoken';

export const validarToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ mensaje: 'Token no enviado' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
  
};

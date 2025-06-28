import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { crearUsuario, buscarUsuarioPorCorreo } from '../models/usuario.model.js';

// Generar tokens
const generarAccessToken = (usuario) => {
  return jwt.sign(usuario, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const generarRefreshToken = (usuario) => {
  return jwt.sign(usuario, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE
  });
};

// Registro (igual que antes)
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol_id } = req.body;
    const hash = await bcrypt.hash(contrasena, 10);
    const resultado = await crearUsuario(nombre, correo, hash, rol_id);
    return res.status(201).json({ mensaje: 'Usuario registrado', id: resultado.insertId });
  } catch (e) {
    res.status(500).json({ mensaje: 'Error en registro', error: e.message });
  }
};

// Login con Access + Refresh Token
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await buscarUsuarioPorCorreo(correo);
    if (!usuario) return res.status(404).json({ mensaje: 'Correo no registrado' });

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const payload = { id: usuario.id, rol: usuario.rol_id };
    const accessToken = generarAccessToken(payload);
    const refreshToken = generarRefreshToken(payload);

    return res.json({
      mensaje: 'Login exitoso',
      token: accessToken,
      refreshToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id
      }
    });
  } catch (e) {
    res.status(500).json({ mensaje: 'Error en login', error: e.message });
  }
};

// Endpoint para renovar el Access Token
export const renovarToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ mensaje: 'Refresh token requerido' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const nuevoToken = generarAccessToken({ id: decoded.id, rol: decoded.rol });
    res.json({ token: nuevoToken });
  } catch {
    res.status(403).json({ mensaje: 'Refresh token inválido o expirado' });
  }
};

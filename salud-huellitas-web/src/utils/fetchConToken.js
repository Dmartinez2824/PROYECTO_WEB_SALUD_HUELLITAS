// src/utils/fetchConToken.js

export async function fetchConToken(url, options) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.warn('⚠️ Token no encontrado');
    return Promise.reject(new Error('Token no encontrado'));
  }

  // Aseguramos que `options` sea al menos un objeto vacío
  options = options || {};

  // Si no hay headers, inicializamos uno
  options.headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  return fetch(url, options);
}

import { crearHeader } from '../../components/header.js';
import { fetchConToken } from '../../utils/fetchConToken.js';

export async function mostrarPanelAdmin(container) {
  const header = crearHeader();
  container.innerHTML = '';
  container.appendChild(header);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const seccion = document.createElement('section');
  seccion.classList.add('panel-admin');

  const saludo = document.createElement('h2');
  saludo.textContent = `👋 Bienvenido, ${usuario.nombre}`;

  // Cards resumen
  const resumen = document.createElement('div');
  resumen.classList.add('resumen-admin');

  const cardUsuarios = document.createElement('div');
  const cardMascotas = document.createElement('div');
  const cardSuscripciones = document.createElement('div');

  [cardUsuarios, cardMascotas, cardSuscripciones].forEach(card =>
    card.classList.add('card-admin')
  );

  cardUsuarios.innerHTML = `<h3>👥 Usuarios</h3><p id="totalUsuarios">0</p>`;
  cardMascotas.innerHTML = `<h3>🐶 Mascotas</h3><p id="totalMascotas">0</p>`;
  cardSuscripciones.innerHTML = `<h3>📦 Suscripciones</h3><p id="totalSuscripciones">0</p>`;

  resumen.append(cardUsuarios, cardMascotas, cardSuscripciones);

  // Botones de acceso
  const accesos = document.createElement('div');
  accesos.classList.add('accesos-admin');

  const btnUsuarios = document.createElement('button');
  btnUsuarios.textContent = '👥 Gestionar Usuarios';
  btnUsuarios.onclick = () => (window.location.hash = '#admin-usuarios');

  const btnMascotas = document.createElement('button');
  btnMascotas.textContent = '🐾 Gestionar Mascotas';
  btnMascotas.onclick = () => (window.location.hash = '#admin-mascotas');

  const btnSuscripciones = document.createElement('button');
  btnSuscripciones.textContent = '📦 Gestionar Suscripciones';
  btnSuscripciones.onclick = () => (window.location.hash = '#admin-suscripciones');

  accesos.append(btnUsuarios, btnMascotas, btnSuscripciones);

  // Armar la vista
  seccion.append(saludo, resumen, accesos);
  container.appendChild(seccion);

  // Llamadas al backend para estadísticas
  try {
    const [usuariosRes, mascotasRes, suscripcionesRes] = await Promise.all([
      fetchConToken('http://localhost:3000/api/admin/usuarios/conteo'),
      fetchConToken('http://localhost:3000/api/admin/mascotas/conteo'),
      fetchConToken('http://localhost:3000/api/admin/suscripciones/conteo')
    ]);

    const usuarios = await usuariosRes.json();
    const mascotas = await mascotasRes.json();
    const suscripciones = await suscripcionesRes.json();

    document.getElementById('totalUsuarios').textContent = usuarios.total;
    document.getElementById('totalMascotas').textContent = mascotas.total;
    document.getElementById('totalSuscripciones').textContent = suscripciones.total;
  } catch (err) {
    console.error('❌ Error al cargar estadísticas del panel admin:', err);
  }
}

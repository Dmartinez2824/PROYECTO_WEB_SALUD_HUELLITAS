import { crearHeader } from '../components/header.js';
import { fetchConToken } from '../utils/fetchConToken.js';

export function mostrarHistorial(container) {
  const header = crearHeader();
  const section = document.createElement('section');
  section.classList.add('dashboard_section');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Historial Clínico de Mis Mascotas';

  const selectMascota = document.createElement('select');
  selectMascota.classList.add('select');
  selectMascota.innerHTML = '<option value="">Selecciona una mascota</option>';

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  const listaHistorial = document.createElement('ul');
  listaHistorial.classList.add('lista-historial');

  section.append(titulo, selectMascota, mensaje, listaHistorial);
  container.innerHTML = '';
  container.append(header, section);

  // Cargar mascotas del usuario
  async function cargarMascotas() {
    try {
      const res = await fetchConToken('http://localhost:3000/api/mascotas');
      const data = await res.json();

      data.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nombre;
        selectMascota.appendChild(opt);
      });
    } catch {
      mensaje.textContent = 'Error al cargar mascotas.';
    }
  }

  // Cargar historial clínico
  async function cargarHistorial(mascotaId) {
    try {
      const res = await fetchConToken(`http://localhost:3000/api/historial/${mascotaId}`);
      const data = await res.json();

      listaHistorial.innerHTML = '';

      if (!data.length) {
        listaHistorial.innerHTML = '<li>No hay historial para esta mascota.</li>';
        return;
      }

      data.forEach(reg => {
        const li = document.createElement('li');
        li.classList.add('historial-card');
        li.innerHTML = `
          <strong>📅 ${reg.fecha} ⏰ ${reg.hora}</strong><br>
          📝 <b>Observación:</b> ${reg.observaciones}<br>
          💊 <b>Tratamiento:</b> ${reg.tratamiento}
        `;
        listaHistorial.appendChild(li);
      });
    } catch (err) {
      listaHistorial.innerHTML = '<li>Error al cargar historial</li>';
    }
  }

  selectMascota.addEventListener('change', (e) => {
    const mascotaId = e.target.value;
    if (mascotaId) {
      cargarHistorial(mascotaId);
    } else {
      listaHistorial.innerHTML = '';
    }
  });

  cargarMascotas();
}

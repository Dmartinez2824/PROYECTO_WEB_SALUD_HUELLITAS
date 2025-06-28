import { crearHeader } from '../components/header.js';
import { fetchConToken } from '../utils/fetchConToken.js';

export function mostrarCitas(container) {
  const header = crearHeader();
  const section = document.createElement('section');
  section.classList.add('dashboard_grid');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Apartar Cita';
  titulo.classList.add('full-width');

  const form = document.createElement('form');
  form.classList.add('formulario');

  const h3 = document.createElement('h3');
  h3.textContent = 'Programar nueva cita';

  const selectMascota = document.createElement('select');
  selectMascota.classList.add('select');
  selectMascota.required = true;

  const selectServicio = document.createElement('select');
  selectServicio.classList.add('select');
  selectServicio.required = true;

  const inputFecha = document.createElement('input');
  inputFecha.type = 'date';
  inputFecha.classList.add('input');
  inputFecha.required = true;

  const inputHora = document.createElement('input');
  inputHora.type = 'time';
  inputHora.classList.add('input');
  inputHora.required = true;

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.classList.add('btn');
  btn.textContent = 'Agendar';

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  form.append(h3, selectMascota, selectServicio, inputFecha, inputHora, btn, mensaje);

  const listaContenedor = document.createElement('div');
  listaContenedor.classList.add('dashboard_section', 'full-width');
  listaContenedor.innerHTML = '<h3>Mis Citas Programadas</h3>';
  const ul = document.createElement('ul');
  ul.classList.add('lista-citas');
  listaContenedor.appendChild(ul);

  section.append(titulo, form, listaContenedor);
  container.innerHTML = '';
  container.append(header, section);

  function mostrarMensaje(texto, tipo = 'ok') {
    mensaje.textContent = texto;
    mensaje.className = tipo === 'error' ? 'mensaje mensaje-error' : 'mensaje mensaje-exito';
  }

  async function cargarMascotas() {
    try {
      const res = await fetchConToken('http://localhost:3000/api/mascotas');
      const data = await res.json();
      selectMascota.innerHTML = '<option value="">Selecciona tu mascota</option>';
      data.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nombre;
        selectMascota.appendChild(opt);
      });
    } catch {
      mostrarMensaje('Error al cargar mascotas', 'error');
    }
  }

  async function cargarServicios() {
    try {
      const res = await fetch('http://localhost:3000/api/servicios');
      const data = await res.json();
      selectServicio.innerHTML = '<option value="">Selecciona tipo de cita</option>';
      data.forEach(obj => {
        const opt = document.createElement('option');
        opt.value = obj.id;
        opt.textContent = obj.nombre;
        selectServicio.appendChild(opt);
      });
    } catch {
      mostrarMensaje('Error al cargar servicios', 'error');
    }
  }

  async function cargarCitas() {
    try {
      const res = await fetchConToken('http://localhost:3000/api/citas');
      const data = await res.json();

      ul.innerHTML = '';
      if (!data.length) {
        ul.innerHTML = '<li>No hay citas programadas.</li>';
        return;
      }

      data.forEach(c => {
        const li = document.createElement('li');
        li.classList.add('cita-card');
        li.innerHTML = `
          <strong>${c.fecha}</strong> a las ${c.hora}<br>
          Mascota: ${c.mascota} | Servicio: ${c.sucursal}
        `;
        ul.appendChild(li);
      });
    } catch {
      ul.innerHTML = '<li>Error al cargar citas</li>';
    }
  }

  async function inicializar() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      mostrarMensaje('Debes iniciar sesión para ver tus citas', 'error');
      return;
    }

    await cargarMascotas();
    await cargarServicios();
    await cargarCitas();
  }

  inicializar();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fecha = inputFecha.value;
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    const mañana = new Date();
    mañana.setDate(hoy.getDate() + 1);

    if (!fecha || isNaN(fechaSeleccionada.getTime())) {
      mostrarMensaje('Selecciona una fecha válida', 'error');
      return;
    }

    if (fechaSeleccionada < mañana) {
      mostrarMensaje('La cita debe ser al menos con 1 día de anticipación.', 'error');
      return;
    }

    const mascota_id = parseInt(selectMascota.value);
    const sucursal_id = parseInt(selectServicio.value);
    const hora = inputHora.value;

    if (!mascota_id || !sucursal_id || !hora) {
      mostrarMensaje('Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const res = await fetchConToken('http://localhost:3000/api/citas', {
        method: 'POST',
        body: JSON.stringify({ mascota_id, sucursal_id, fecha, hora })
      });

      const data = await res.json();
      if (res.ok) {
        mostrarMensaje('Cita agendada exitosamente');
        form.reset();
        await cargarCitas();
      } else {
        mostrarMensaje(data.mensaje || 'Error al agendar cita', 'error');
      }
    } catch {
      mostrarMensaje('Error al enviar cita', 'error');
    }
  });
}

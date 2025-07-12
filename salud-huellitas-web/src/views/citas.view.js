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
  const selectSucursal = document.createElement('select');
  selectSucursal.classList.add('select');
  selectSucursal.required = true;
  selectSucursal.innerHTML = '<option value="">Selecciona una sucursal</option>'; 

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

  const detalles = document.createElement('p');
  detalles.textContent = 'Recuerde que dependiendo del servicio seleccionado, se le asignara la sucursal correspondiente.';
  detalles.classList.add('detalles');

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  form.append(h3, selectMascota, selectServicio,selectSucursal, inputFecha, inputHora, btn, detalles, mensaje);

  const listaContenedor = document.createElement('div');
  listaContenedor.classList.add( 'full-width');
  listaContenedor.innerHTML = '<h3>Mis Citas Programadas</h3>';
  const ul = document.createElement('ul');
  ul.classList.add('lista-citas');
  listaContenedor.appendChild(ul);

  section.append(titulo, form, listaContenedor);
  container.innerHTML = '';
  container.append(header, section);

  // Mostrar mensaje de éxito o error
  function mostrarMensaje(texto, tipo = 'ok') {
    mensaje.textContent = texto;
    mensaje.className = tipo === 'error' ? 'mensaje mensaje-error' : 'mensaje mensaje-exito';
  }

  // Cargar mascotas desde backend
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

  async function cargarSucursales() {
  try {
    const res = await fetch('http://localhost:3000/api/sucursales');
    const data = await res.json();

    selectSucursal.innerHTML = '<option value="">Selecciona una sucursal</option>';
    data.forEach(sucursal => {
      const opt = document.createElement('option');
      opt.value = sucursal.id;
      opt.textContent = sucursal.nombre;
      selectSucursal.appendChild(opt);
    });
  } catch (e) {
    console.error('❌ Error al cargar sucursales:', e);
    selectSucursal.innerHTML = '<option value="">Error al cargar sucursales</option>';
  }
}


  // Cargar servicios desde backend
  async function cargarServicios() {
    try {
      const res = await fetch('http://localhost:3000/api/servicios');
      const data = await res.json();
      selectServicio.innerHTML = '<option value="">Selecciona tipo de cita</option>';
      data.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.nombre;
        selectServicio.appendChild(opt);
      });
    } catch {
      mostrarMensaje('Error al cargar servicios', 'error');
    }
  }

  // Mostrar citas programadas del usuario
  async function cargarCitas() {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('🧪 Token actual:', token);

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

  // Estilos por estado
  let estadoColor = '#f1c40f'; // amarillo por defecto
  if (c.estado === 'aceptada') estadoColor = '#2ecc71';
  if (c.estado === 'rechazada') estadoColor = '#e74c3c'; // rojo

  // Estructura de la cita
  li.innerHTML = `
    <div class = card_citas style="
      border-left: 10px solid ${estadoColor};
      border-righ
    ">
      <p><strong>📅 Fecha:</strong> ${c.fecha} a las ${c.hora}</p>
      <p><strong>🐶 Mascota:</strong> ${c.mascota}</p>
      <p><strong>🏥 Sucursal:</strong> ${c.sucursal}</p>
      <p><strong>🩺 Servicio:</strong> ${c.servicio || 'No asignado'}</p>
      <p><strong>📌 Estado:</strong> <span style="color: ${estadoColor}; font-weight: bold;">${c.estado}</span></p>
    </div>
  `;
  ul.appendChild(li);
});

    } catch (error) {
  console.error('❌ Error al cargar citas:', error);
  ul.innerHTML = '<li>Error al cargar citas</li>';
    }
  }

  // Enviar cita al backend
 form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mascota_id = parseInt(selectMascota.value);
  const servicio_id = parseInt(selectServicio.value);  // nuevo
  const sucursal_id = parseInt(selectSucursal.value);  // nuevo
  const fecha = inputFecha.value;
  const hora = inputHora.value;

  if (!mascota_id || !servicio_id || !sucursal_id || !fecha || !hora) {
    mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }

  try {
    const token = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3000/api/citas', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mascota_id, sucursal_id, servicio_id, fecha, hora })
    });

    const data = await res.json();
    if (res.ok) {
      mostrarMensaje('Cita agendada exitosamente');
      form.reset();
      await cargarCitas();
    } else {
      mostrarMensaje(data.mensaje || 'Error al agendar cita', 'error');
    }
  } catch (err) {
    mostrarMensaje('Error de conexión', 'error');
  }
});


  // Inicializar todo
  cargarMascotas();
  cargarServicios();
  cargarSucursales();
  cargarCitas();
}

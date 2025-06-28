import { crearHeader } from '../components/header.js';

export function mostrarMascotas(container) {
  const header = crearHeader();
  const section = document.createElement('section');
  section.classList.add('dashboard_grid');

  const titulo = document.createElement('h2');
  titulo.textContent = '🐾 Mis Mascotas';
  titulo.classList.add('full-width');

  // Crear formulario
  const form = document.createElement('form');
  form.classList.add('formulario');

  const h3 = document.createElement('h3');
  h3.textContent = 'Registrar Mascota';

  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = 'Nombre de la mascota';
  inputNombre.required = true;
  inputNombre.classList.add('input');

  const selectEspecie = document.createElement('select');
  selectEspecie.required = true;
  selectEspecie.classList.add('select');
  selectEspecie.innerHTML = `<option value="">Selecciona especie</option>`;

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Registrar';
  btn.classList.add('btn');

  const mensaje = document.createElement('p');
  mensaje.classList.add('mensaje');

  form.append(h3, inputNombre, selectEspecie, btn, mensaje);

  // Lista de mascotas
  const listaContenedor = document.createElement('div');
  listaContenedor.classList.add('dashboard_section', 'full-width');
  listaContenedor.innerHTML = '<h3>Mascotas registradas:</h3>';

  const ul = document.createElement('ul');
  ul.classList.add('lista-mascotas');
  listaContenedor.appendChild(ul);

  section.append(titulo, form, listaContenedor);
  container.innerHTML = '';
  container.append(header, section);

  // Mostrar mensajes
  function mostrarMensaje(texto, tipo = 'ok') {
    mensaje.textContent = texto;
    mensaje.className = tipo === 'error' ? 'mensaje mensaje-error' : 'mensaje mensaje-exito';
  }

  // Cargar especies desde la tabla especies de MySQL
  async function cargarEspecies() {
    try {
      const res = await fetch('http://localhost:3000/api/especies');
      const data = await res.json();

      selectEspecie.innerHTML = `<option value="">Selecciona especie</option>`;
      data.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = e.nombre;
        selectEspecie.appendChild(option);
      });
    } catch (e) {
      mostrarMensaje('Error al cargar especies', 'error');
    }
  }

  // Cargar mascotas del usuario autenticado
  async function cargarMascotas() {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3000/api/mascotas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      ul.innerHTML = '';
      if (!data || !Array.isArray(data) || data.length === 0) {
        ul.innerHTML = '<li>No hay mascotas registradas</li>';
        return;
      }

      data.forEach(m => {
        const li = document.createElement('li');
        li.classList.add('mascota-card');
        li.textContent = `${m.nombre} (${m.especie})`;
        ul.appendChild(li);
      });
    } catch (e) {
      ul.innerHTML = '<li>Error al cargar mascotas</li>';
    }
  }

  // Registrar nueva mascota
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const especie_id = parseInt(selectEspecie.value);
    const token = localStorage.getItem('accessToken');

    if (!nombre || !especie_id) {
      mostrarMensaje('Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/mascotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, especie_id })
      });

      const data = await res.json();

      if (res.ok) {
        mostrarMensaje('Mascota registrada exitosamente');
        form.reset();
        await cargarMascotas();
      } else {
        mostrarMensaje(data.mensaje || 'Error al registrar', 'error');
      }
    } catch (e) {
      mostrarMensaje('Error de conexión con el servidor', 'error');
    }
  });

  cargarEspecies();
  cargarMascotas();
}

import { fetchConToken } from '../../utils/fetchConToken.js';
import { crearHeader } from '../../components/header.js';

export async function mostrarMascotasAdmin(container) {
  const header = crearHeader();
  container.innerHTML = '';
  container.appendChild(header);

  const seccion = document.createElement('section');
  seccion.classList.add('panel-admin');

  const titulo = document.createElement('h2');
  titulo.textContent = '🐾 Panel de Mascotas';

  const tabla = document.createElement('table');
  tabla.classList.add('tabla-admin');

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre Mascota</th>
        <th>Dueño</th>
        <th>Correo</th>
        <th>Plan</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="cuerpoTablaMascotas">
    </tbody>
  `;

  const tbody = tabla.querySelector('#cuerpoTablaMascotas');

  try {
    const res = await fetchConToken('http://localhost:3000/api/admin/mascotas');
    const mascotas = await res.json();

    mascotas.forEach(m => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${m.id_mascota}</td>
        <td>${m.nombre_mascota}</td>
        <td>${m.nombre_duenio}</td>
        <td>${m.correo}</td>
        <td>${m.plan_suscripcion}</td>
        <td>${m.activo ? '✅ Activo' : '🚫 Inactivo'}</td>
        <td></td>
      `;

      const btnAccion = document.createElement('button');
      btnAccion.classList.add('btn-accion-mascota');

      if (m.activo) {
        btnAccion.textContent = 'Desactivar';
        btnAccion.style.backgroundColor = '#e74c3c';
      } else {
        btnAccion.textContent = 'Reactivar';
        btnAccion.style.backgroundColor = '#2ecc71';
      }

      btnAccion.onclick = async () => {
        const accion = m.activo ? 'inactivar' : 'reactivar';
        const confirmar = confirm(`¿Deseas ${accion} la mascota "${m.nombre_mascota}"?`);
        if (!confirmar) return;

        try {
          const res = await fetchConToken(`http://localhost:3000/api/admin/mascotas/${m.id_mascota}/${accion}`, {
            method: 'PATCH'
          });

          const data = await res.json();

          if (res.ok) {
            alert(data.mensaje);
            window.location.reload();
          } else {
            alert(`❌ Error: ${data.mensaje}`);
          }
        } catch (err) {
          console.error(`❌ Error al ${accion} mascota:`, err);
          alert('❌ Error en la conexión');
        }
      };

      fila.querySelector('td:last-child').appendChild(btnAccion);
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error('❌ Error al cargar mascotas:', error);
  }

  seccion.append(titulo, tabla);
  container.appendChild(seccion);
}

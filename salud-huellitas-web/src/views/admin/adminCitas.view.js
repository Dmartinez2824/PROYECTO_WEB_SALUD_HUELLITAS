import { fetchConToken } from '../../utils/fetchConToken.js';
import { crearHeader } from '../../components/header.js';

export async function mostrarCitasAdmin(container) {
  const header = crearHeader();
  container.innerHTML = '';
  container.appendChild(header);

  const seccion = document.createElement('section');
  seccion.classList.add('panel-admin');

  const titulo = document.createElement('h2');
  titulo.textContent = '📅 Panel de Citas';

  const tabla = document.createElement('table');
  tabla.classList.add('tabla-admin');

  tabla.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Mascota</th>
        <th>Dueño</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Motivo</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="cuerpoTablaCitas">
    </tbody>
  `;

  const tbody = tabla.querySelector('#cuerpoTablaCitas');

  try {
    const res = await fetchConToken('http://localhost:3000/api/admin/citas');
    const citas = await res.json();

    citas.forEach(c => {
      const fila = document.createElement('tr');
      // Convertir fecha y hora a formato legible
        const fechaFormateada = new Date(c.fecha).toISOString().split('T')[0]; // YYYY-MM-DD
        const horaFormateada = c.hora?.slice(0, 5); // HH:MM

        fila.innerHTML = `
        <td>${c.id_cita}</td>
        <td>${c.nombre_mascota}</td>
        <td>${c.nombre_duenio}</td>
        <td>${fechaFormateada}</td>
        <td>${horaFormateada}</td>
        <td>${c.motivo}</td>
        <td>${c.estado}</td>
        <td></td>
        `;


      const contenedorBtns = document.createElement('div');
      contenedorBtns.style.display = 'flex';
      contenedorBtns.style.gap = '0.5rem';
      contenedorBtns.style.justifyContent = 'center';

      if (c.estado === 'pendiente') {
        ['aceptada', 'rechazada'].forEach(estado => {
          const btn = document.createElement('button');
          btn.textContent = estado === 'aceptada' ? 'Aceptar' : 'Rechazar';
          btn.classList.add('btn-cita-' + estado);
          btn.onclick = async () => {
            const confirmar = confirm(`¿Deseas marcar la cita como ${estado}?`);
            if (!confirmar) return;

            try {
             const res = await fetchConToken(`http://localhost:3000/api/admin/citas/${c.id_cita}/estado`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ estado })
                });


              const data = await res.json();

              if (res.ok) {
                alert(data.mensaje);
                window.location.reload();
              } else {
                alert('❌ ' + data.mensaje);
              }
            } catch (err) {
              console.error('❌ Error al actualizar cita:', err);
            }
          };
          contenedorBtns.appendChild(btn);
        });
      } else {
        const texto = document.createElement('span');
        texto.textContent = '—';
        contenedorBtns.appendChild(texto);
      }

      fila.querySelector('td:last-child').appendChild(contenedorBtns);
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error('❌ Error al cargar citas:', error);
  }

  seccion.append(titulo, tabla);
  container.appendChild(seccion);
}

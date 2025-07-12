import { crearHeader } from '../components/header.js';

export function mostrarPanelCliente(container) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const header = crearHeader();

  const section = document.createElement('section');
  section.classList.add('dashboard_grid');

  const bienvenida = document.createElement('div');
  bienvenida.classList.add('dashboard_section');
  bienvenida.innerHTML = `
    <h2>Hola, ${usuario?.nombre || 'Cliente'} 👋</h2>
    <p>Este es tu panel. Aquí puedes gestionar tus mascotas y citas.</p>
  `;

  // Tarjetas de acceso
  const opciones = [
    { texto: '🐶 Mis Mascotas', ruta: '#mascotas', color: '#63C8B7' },
    { texto: '📅 Mis Citas', ruta: '#citas', color: '#719BFD' },
    { texto: '🧾 Suscripcion', ruta: '#suscripcion', color: '#63C8B7' },
    { texto: '🔐 Cerrar sesión', ruta: '#', color: '#fd7979' }
  ];

  const tarjetas = opciones.map(op => {
    const card = document.createElement('div');
    card.classList.add('dashboard_section');
    card.style.backgroundColor = op.color;
    card.style.cursor = 'pointer';
    card.style.color = 'white';

    const h3 = document.createElement('h3');
    h3.textContent = op.texto;
    card.appendChild(h3);

    card.addEventListener('click', () => {
      if (op.ruta === '#') {
        localStorage.clear();
        window.location.hash = '#';
        location.reload();
      } else {
        window.location.hash = op.ruta;
      }
    });

    return card;
  });

  container.innerHTML = '';
  container.append(header, bienvenida, ...tarjetas);
}

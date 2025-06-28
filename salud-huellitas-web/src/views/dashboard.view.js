import { crearHeader } from '../components/header.js';

export function mostrarDashboard(container) {
  const header = crearHeader();
  container.innerHTML = '';
  container.appendChild(header);

  // 1. Sección principal
  const seccionPrincipal = document.createElement('section');
  seccionPrincipal.classList.add('dashboard_section_1');

  const titulo = document.createElement('h1');
  titulo.textContent = 'Bienvenido a Salud Huellitas 🐾';

  const texto = document.createElement('p');
  texto.textContent = 'Nos dedicamos al cuidado, protección y salud de tus mascotas.';

  seccionPrincipal.append(titulo, texto);

  // 2. Grid 2x2 (6 secciones)
  const seccionGrid = document.createElement('section');
  seccionGrid.classList.add('dashboard_grid');

  const secciones = [
    'Atención Veterinaria 24/7',
    'Vacunación y desparasitación',
    'Citas programadas online',
    'Servicios de peluquería canina',
    'Tienda de productos para mascotas',
    'Adopciones y bienestar animal'
  ];

  secciones.forEach((titulo, i) => {
    const sec = document.createElement('div');
    sec.classList.add('dashboard_section');
    sec.classList.add('dashboard_section_orden');
    const h3 = document.createElement('h3');
    h3.textContent = `🐾 ${titulo}`;
    const p = document.createElement('p');
    p.textContent = `Descripción corta de "${titulo}". Aquí puedes escribir lo que quieras.`;

    sec.append(h3, p);
    seccionGrid.appendChild(sec);
  });

  // 3. Footer
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>&copy; 2025 Salud Huellitas Web - Todos los derechos reservados</p>
    <p>Contacto: info@saludhuellitas.com | Bucaramanga, Colombia</p>
  `;

  // Ensamblar todo
  container.appendChild(seccionPrincipal);
  container.appendChild(seccionGrid);
  container.appendChild(footer);
}

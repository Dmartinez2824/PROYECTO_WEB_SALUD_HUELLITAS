import logo from './IMG/file.png';

export function crearHeader() {
  const head = document.head;
  const link_1 = document.createElement('link');
  link_1.rel = 'stylesheet';
  link_1.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
  head.appendChild(link_1);

  const header = document.createElement('header');
  header.classList.add('header');

  const contenedor = document.createElement('div');
  contenedor.classList.add('contenedor_header');

  const logoLink = document.createElement('a');
  logoLink.href = '#';
  logoLink.classList.add('logo');

  const logoImg = document.createElement('img');
  logoImg.src = logo;
  logoImg.alt = 'Logo';
  logoImg.classList.add('img_logo');

  logoLink.appendChild(logoImg);

  const nav = document.createElement('div');
  nav.classList.add('navegador');

  const ul = document.createElement('ul');
  ul.classList.add('list_navegacion');

  // Detectar usuario y rol
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  let rol_id = usuario?.rol_id;

  // Menú dinámico según rol
  let items = [
    { hash: '#', icon: 'bx-home', text: 'Inicio' }
  ];

  if (rol_id === 3) {
    items.push(
      { hash: '#suscripcion', icon: 'bx-network-chart', text: 'Suscripción' },
      { hash: '#mascotas', icon: 'bx-briefcase-alt-2', text: 'Mis Mascotas' },
      { hash: '#citas', icon: 'bx-message', text: 'Mis Citas' },
      // { hash: '#historial', icon: 'bx-bell', text: 'Historial' }
    );
  } else if (rol_id === 1) {
    items.push(
      { hash: '#admin-citas', icon: 'bx-calendar', text: 'Citas del Día' },
      { hash: '#admin-mascotas', icon: 'bx-notepad', text: 'Mascotas' },
      // { hash: '#usuarios', icon: 'bx-user', text: 'Usuarios' },
      // { hash: '#servicios', icon: 'bx-cog', text: 'Servicios' },
      // { hash: '#reportes', icon: 'bx-bar-chart-alt-2', text: 'Reportes' }
    );
  }

  // Construir los items del menú
  items.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('item');

    const a = document.createElement('a');
    a.href = item.hash;

    const i = document.createElement('i');
    i.className = `bx ${item.icon} icon_menu`;

    const span = document.createElement('span');
    span.classList.add('text_icon');
    span.textContent = item.text;

    a.append(i, span);
    li.appendChild(a);
    ul.appendChild(li);
  });

  // Perfil o login/registro
  const contenedorPerfil = document.createElement('div');
  contenedorPerfil.classList.add('contenedor_perfil');

  if (usuario) {
    const imgContenedor = document.createElement('div');
    imgContenedor.classList.add('contenedor_img');

    const img = document.createElement('img');
    img.src = '../img/profile.png';
    img.alt = 'Perfil';
    img.classList.add('perfil_img');

    img.addEventListener('click', () => {
      if (rol_id === 3) {
        window.location.hash = '#panel-cliente';
      } else if (rol_id === 1) {
        window.location.hash = '#panel-admin';
      }
    });

    imgContenedor.appendChild(img);

    const btnCerrar = document.createElement('button');
    btnCerrar.textContent = 'Cerrar sesión';
    btnCerrar.classList.add('buton_header');
    btnCerrar.onclick = () => {
      localStorage.clear();
      window.location.hash = '#';
      location.reload();
    };

    contenedorPerfil.append(imgContenedor, btnCerrar);
  } else {
    // Si no está logueado, muestro botones de acceso
    const btnLogin = document.createElement('button');
    btnLogin.textContent = 'Iniciar sesión';
    btnLogin.classList.add('buton_header');
    btnLogin.onclick = () => window.location.hash = '#login';

    const btnRegistro = document.createElement('button');
    btnRegistro.textContent = 'Registrarme';
    btnRegistro.classList.add('buton_header');
    btnRegistro.onclick = () => window.location.hash = '#registro';

    contenedorPerfil.append(btnLogin, btnRegistro);
  }

  // Armar navegación
  nav.appendChild(ul);
  nav.appendChild(contenedorPerfil);
  contenedor.append(logoLink, nav);
  header.appendChild(contenedor);

  return header;
}

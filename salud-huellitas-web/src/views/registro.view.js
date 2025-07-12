import { crearHeader } from '../components/header.js';

export function mostrarRegistro(container) {
  const header = crearHeader();

  const section = document.createElement('section');
  section.classList.add('login-contenedor');

  const ladoIzquierdo = document.createElement('div');
  ladoIzquierdo.classList.add('login-izquierda');
  ladoIzquierdo.innerHTML = `
    <h2>Únete a Salud Huellitas 🐾</h2>
    <img src="/img/fondo_registro.png" alt="registro" class="login-logo"> 
  `;

  const ladoDerecho = document.createElement('div');
  ladoDerecho.classList.add('login-derecha');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Registro de Cliente';

  const form = document.createElement('form');
  form.id = 'form-registro';

  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = 'Nombre completo';
  inputNombre.required = true;

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo electrónico';
  inputCorreo.required = true;

  const inputPass = document.createElement('input');
  inputPass.type = 'password';
  inputPass.placeholder = 'Contraseña';
  inputPass.required = true;

  const inputConfirmPass = document.createElement('input');
  inputConfirmPass.type = 'password';
  inputConfirmPass.placeholder = 'Confirmar contraseña';
  inputConfirmPass.required = true;

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Registrarme';

  const mensaje = document.createElement('p');
  mensaje.id = 'mensaje-registro';

  const irLogin = document.createElement('p');
  irLogin.innerHTML = `¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>`;

  form.append(inputNombre, inputCorreo, inputPass, inputConfirmPass, btn, mensaje);
  ladoDerecho.append(titulo, form, irLogin);

  section.append(ladoIzquierdo, ladoDerecho);
  container.innerHTML = '';
  container.append(header, section);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const contrasena = inputPass.value.trim();
    const confirmar = inputConfirmPass.value.trim();

const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

if (contrasena !== confirmar) {
  mensaje.textContent = 'Las contraseñas no coinciden.';
  mensaje.className = 'mensaje mensaje-error';
  return;
}

if (!regexContrasena.test(contrasena)) {
  mensaje.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.';
  mensaje.className = 'mensaje mensaje-error';
  return;
}


  try {
  const res = await fetch('http://localhost:3000/api/usuarios/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, contrasena, rol_id: 3 })
  });

  const data = await res.json();

  if (res.ok) {
    mensaje.textContent = '✅ Registro exitoso. Redirigiendo...';
    mensaje.style.color = 'green';
    setTimeout(() => {
      window.location.hash = '#login';
    }, 1500);
  } else {
    // Mostrar mensaje claro del backend
    mensaje.textContent = data.mensaje || '❌ Error al registrar el usuario.';
    mensaje.style.color = 'red';
  }
} catch (error) {
  // Solo para errores de red o de conexión
  mensaje.textContent = '❌ Error de conexión con el servidor.';
  mensaje.style.color = 'red';
}

  });
}

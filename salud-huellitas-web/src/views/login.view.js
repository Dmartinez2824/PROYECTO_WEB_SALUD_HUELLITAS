import { crearHeader } from '../components/header.js';

export function mostrarLogin(container) {
  const header = crearHeader();

  const section = document.createElement('section');
  section.classList.add('login-contenedor');

  // Lado izquierdo (imagen o color de fondo)
  const ladoIzquierdo = document.createElement('div');
  ladoIzquierdo.classList.add('login-izquierda');
  ladoIzquierdo.innerHTML = `<img src="../img/imagen_login2.jpg" alt="logo" class="login-logo" />`;

  // Lado derecho (formulario)
  const ladoDerecho = document.createElement('div');
  ladoDerecho.classList.add('login-derecha');

  const titulo = document.createElement('h2');
  titulo.textContent = 'Iniciar Sesión';

  const form = document.createElement('form');
  form.id = 'form-login';

  const inputCorreo = document.createElement('input');
  inputCorreo.type = 'email';
  inputCorreo.placeholder = 'Correo electrónico';
  inputCorreo.required = true;

  const inputPass = document.createElement('input');
  inputPass.type = 'password';
  inputPass.placeholder = 'Contraseña';
  inputPass.required = true;

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Iniciar sesión';

  const mensaje = document.createElement('p');
  mensaje.id = 'mensaje-login';

  const enlaceRegistro = document.createElement('p');
  enlaceRegistro.innerHTML = `¿No tienes cuenta? <a href="#registro">Regístrate aquí</a>`;

  form.append(inputCorreo, inputPass, btn, mensaje);
  ladoDerecho.append(titulo, form, enlaceRegistro);

  // Ensamblar la vista completa
  section.append(ladoIzquierdo, ladoDerecho);

  container.innerHTML = '';
  container.append(header, section);

  // Lógica de login
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: inputCorreo.value.trim(),
          contrasena: inputPass.value.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        const rol = data.usuario.rol_id;
        if (rol === 3) window.location.hash = '#panel-cliente';
        else if (rol === 2) window.location.hash = '#panel-empleado';
        else if (rol === 1) window.location.hash = '#panel-admin';
      } else {
        mensaje.textContent = data.mensaje;
        mensaje.style.color = 'red';
      }
    } catch (err) {
      mensaje.textContent = 'Error al iniciar sesión';
      mensaje.style.color = 'red';
    }
  });
}

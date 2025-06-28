
//importar el archivo router,
// el cual será responsable de mostrar las diferentes vistas SPA.
import { router } from './routers/router.js';

// Cuando la página cargue completamente (evento DOMContentLoaded),
// llamo al router para mostrar la vista correspondiente a la URL actual (por ejemplo: #registro o #login).
document.addEventListener('DOMContentLoaded', () => {
  router(); // Esto carga el dashboard o cualquier vista actual.
});

// También debo escuchar los cambios en la URL del navegador.
// Como estoy trabajando con rutas tipo hash (#), uso 'hashchange'.
// Cada vez que el usuario cambie la ruta (por ejemplo al hacer clic en “Iniciar sesión”),
// el router se ejecutará nuevamente para mostrar la vista correspondiente.
window.addEventListener('hashchange', () => {
  router(); // Reacciona al cambio y actualiza la vista SPA sin recargar la página.
});

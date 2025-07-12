import { mostrarDashboard } from '../views/dashboard.view.js';
import { mostrarLogin } from '../views/login.view.js';
import { mostrarRegistro } from '../views/registro.view.js';
import { mostrarPanelCliente } from '../views/panelCliente.view.js';
import { mostrarMascotas } from '../views/mascotas.view.js';
import { mostrarCitas } from '../views/citas.view.js';
import { mostrarHistorial } from '../views/historial.view.js';
import { mostrarSuscripciones } from '../views/suscripcion.view.js';
import { mostrarPanelAdmin } from '../views/admin/panelAdmin.view.js';
import { mostrarMascotasAdmin } from '../views/admin/adminMascotas.view.js';
import { mostrarCitasAdmin } from '../views/admin/adminCitas.view.js';




export function router() {
  const ruta = location.hash || '#';
  const app = document.getElementById('app');
  app.innerHTML = '';
  
  switch (ruta) {
    case '#login':
      mostrarLogin(app);
      break;
    case '#registro':
        mostrarRegistro(app);
      break;
    case '#panel-cliente':
          mostrarPanelCliente(app);
      break;
    case '#mascotas':
        mostrarMascotas(app);
      break;
    case '#citas':
      mostrarCitas(app);
      break;
    case '#historial':
        mostrarHistorial(app);
      break;
    case '#suscripcion':
        mostrarSuscripciones(app);
      break;
    case '#panel-admin':
        mostrarPanelAdmin(app);
      break;
    case '#admin-mascotas':
        mostrarMascotasAdmin(app);
      break;
    case '#admin-citas':
        mostrarCitasAdmin(app);
      break;
    default:
      mostrarDashboard(app);
      break;
  }
}

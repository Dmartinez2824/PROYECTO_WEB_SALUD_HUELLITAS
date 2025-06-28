import { mostrarDashboard } from '../views/dashboard.view.js';
import { mostrarLogin } from '../views/login.view.js';
import { mostrarRegistro } from '../views/registro.view.js';
import { mostrarPanelCliente } from '../views/panelCliente.view.js';
import { mostrarMascotas } from '../views/mascotas.view.js';
import { mostrarCitas } from '../views/citas.view.js';


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
    default:
      mostrarDashboard(app);
      break;
  }
}

import { crearHeader } from '../components/header.js';
import { fetchConToken } from '../utils/fetchConToken.js';

export function mostrarSuscripciones(container) {
  const header = crearHeader();
  container.innerHTML = '';
  container.appendChild(header);

  const seccionCards = document.createElement('section');
  seccionCards.classList.add('div_contenedor_suscripciones');

  const planes = [
    {
      titulo: 'Plan Básico',
      descripcion: 'Consultas generales para una mascota.',
      tipo: 'individual',
      clase: 'basico'
    },
    {
      titulo: 'Plan Premium',
      descripcion: 'Consultas 24/7, vacunas y subsidios para una mascota.',
      tipo: 'individual',
      clase: 'premium'
    },
    {
      titulo: 'Plan Familiar',
      descripcion: 'Protege de 3 a 7 mascotas con atención completa.',
      tipo: 'familiar',
      clase: 'familiar'
    }
  ];

  let tipoPlanSeleccionado = '';

  const formularioSeccion = document.createElement('section');
  formularioSeccion.classList.add('formulario_suscripciones');

  const form = document.createElement('form');
  form.classList.add('formulario', 'formulario_suscripciones');

  const tituloForm = document.createElement('h3');
  tituloForm.textContent = 'Formulario de Suscripción';

  const inputDireccion = document.createElement('input');
  inputDireccion.placeholder = 'Dirección de entrega';
  inputDireccion.classList.add('input');
  inputDireccion.required = true;

  const inputTelefono = document.createElement('input');
  inputTelefono.placeholder = 'Teléfono de contacto';
  inputTelefono.classList.add('input');
  inputTelefono.required = true;

  const inputPlan = document.createElement('input');
  inputPlan.id = 'planSeleccionado';
  inputPlan.placeholder = 'Plan seleccionado';
  inputPlan.classList.add('input');
  inputPlan.readOnly = true;

  const mascotaInputContainer = document.createElement('div');
  mascotaInputContainer.classList.add('columna');
  mascotaInputContainer.style.display = 'none';

  const selectMascota = document.createElement('select');
  selectMascota.classList.add('select');
  mascotaInputContainer.appendChild(selectMascota);

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Confirmar suscripción';
  btn.classList.add('btn');

  const mensajeConfirmacion = document.createElement('p');
  mensajeConfirmacion.classList.add('mensaje');

  const mensajeExtra = document.createElement('p');
  mensajeExtra.classList.add('mensaje-extra');
  mensajeExtra.textContent = '📍 Selecciona un plan para registrarte';

  const mensajeExtra_1 = document.createElement('p');
  mensajeExtra_1.classList.add('mensaje-extra');
  mensajeExtra_1.textContent = '📍 Acércate a una sucursal para finalizar tu suscripción.';

  form.append(
    tituloForm,
    inputDireccion,
    inputTelefono,
    inputPlan,
    mascotaInputContainer,
    mensajeExtra,
    btn,
    mensajeConfirmacion,
    mensajeExtra_1
  );
  

  formularioSeccion.appendChild(form);

  async function cargarMascotas() {
    try {
      const res = await fetchConToken('http://localhost:3000/api/mascotas');
      const data = await res.json();
      selectMascota.innerHTML = '<option value="">Selecciona una mascota</option>';
      data.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nombre;
        selectMascota.appendChild(opt);
      });
    } catch (err) {
      selectMascota.innerHTML = '<option>Error al cargar</option>';
      console.error('❌ Error al cargar mascotas:', err);
    }
  }

  planes.forEach(plan => {
    const card = document.createElement('div');
    card.classList.add('card_suscripciones', 'div_suscripcion', plan.clase);

    const titulo = document.createElement('h3');
    titulo.textContent = plan.titulo;

    const descripcion = document.createElement('p');
    descripcion.textContent = plan.descripcion;

    const btnSuscribirse = document.createElement('button');
    btnSuscribirse.textContent = 'Suscribirme';
    btnSuscribirse.classList.add('btn');

    btnSuscribirse.onclick = async () => {
      inputPlan.value = plan.titulo;
      tipoPlanSeleccionado = plan.tipo;
      if (plan.tipo === 'individual') {
      mascotaInputContainer.style.display = 'block';
      selectMascota.setAttribute('required', true);
      await cargarMascotas();
      } else {
      mascotaInputContainer.style.display = 'none';
      selectMascota.removeAttribute('required');
      }


      form.scrollIntoView({ behavior: 'smooth' });
    };

    card.append(titulo, descripcion, btnSuscribirse);
    seccionCards.appendChild(card);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const direccion = inputDireccion.value.trim();
    const telefono = inputTelefono.value.trim();
    const plan = inputPlan.value;
    const mascota_id = selectMascota.value;

    if (!direccion || !telefono || !plan || (tipoPlanSeleccionado === 'individual' && !mascota_id)) {
      mensajeConfirmacion.textContent = '⚠️ Por favor completa todos los campos';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
      return;
    }

    if (tipoPlanSeleccionado === 'familiar') {
  try {
    const resMascotas = await fetchConToken('http://localhost:3000/api/mascotas');
    const mascotas = await resMascotas.json();

    if (mascotas.length < 3) {
      mensajeConfirmacion.textContent = '⚠️ El Plan Familiar requiere al menos 3 mascotas registradas (máximo 7).';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
      return;
    }

    if (mascotas.length > 7) {
      mensajeConfirmacion.textContent = '⚠️ Has excedido el límite de mascotas para el Plan Familiar (máximo 7).';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
      return;
    }

    const resSuscripciones = await fetchConToken('http://localhost:3000/api/suscripciones');
    const suscripciones = await resSuscripciones.json();

    const mascotasYaSuscritas = suscripciones.map(s => s.mascota_id);
    const mascotasSinSuscribir = mascotas.filter(m => !mascotasYaSuscritas.includes(m.id));

    if (mascotasSinSuscribir.length < mascotas.length) {
      mensajeConfirmacion.textContent =
        '⚠️ Una o más de tus mascotas ya están suscritas a planes individuales. ' +
        'Para activar el Plan Familiar, por favor comunícate con tu sucursal más cercana o nuestra línea de atención.';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
      return;
    }

    // Si ninguna mascota tiene plan activo → registrar todas
    const respuesta = await fetchConToken('http://localhost:3000/api/suscripciones/familiar', {
      method: 'POST',
      body: JSON.stringify({
        direccion,
        telefono,
        plan,
        mascotas: mascotas.map(m => m.id)
      })
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      mensajeConfirmacion.textContent = data.mensaje || '❌ No se pudo completar el registro.';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
      return;
    }

    mensajeConfirmacion.textContent = data.mensaje;
    mensajeConfirmacion.className = 'mensaje mensaje-exito';
    form.reset();
    mascotaInputContainer.style.display = 'none';

  } catch (err) {
    mensajeConfirmacion.textContent = '❌ Error de conexión con el servidor';
    mensajeConfirmacion.className = 'mensaje mensaje-error';
  }

  return;
}


    try {
      const res = await fetchConToken('http://localhost:3000/api/suscripciones', {
        method: 'POST',
        body: JSON.stringify({ direccion, telefono, plan, mascota_id })
      });

      const data = await res.json();

      if (!res.ok) {
        mensajeConfirmacion.textContent = data.mensaje || '❌ Error al registrar la suscripción';
        mensajeConfirmacion.className = 'mensaje mensaje-error';
        return;
      }

      mensajeConfirmacion.textContent = '🎉 ¡Suscripción registrada exitosamente!';
      mensajeConfirmacion.className = 'mensaje mensaje-exito';
      form.reset();
      mascotaInputContainer.style.display = 'none';

    } catch (err) {
      mensajeConfirmacion.textContent = '❌ Error de conexión con el servidor';
      mensajeConfirmacion.className = 'mensaje mensaje-error';
    }
  });

  const footer = document.createElement('footer');
  footer.innerHTML = `
    <p>&copy; 2025 Salud Huellitas Web</p>
    <p>info@saludhuellitas.com</p>
  `;

  container.append(seccionCards, formularioSeccion, footer);
}

// Importaciones principales
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Importar rutas
import usuarioRoutes from './src/routes/usuario.routes.js'; // aún por crear
import mascotaRoutes from './src/routes/mascota.routes.js';
import citaRoutes from './src/routes/cita.routes.js';
import servicioRoutes from './src/routes/servicio.routes.js';
import historialRoutes from './src/routes/historial.routes.js';
import especieRoutes from './src/routes/especie.routes.js';

// Cargar variables de entorno

dotenv.config(); //carga todo el archivo .env en process.env

// Inicializar aplicación
const app = express();

// Middlewares para procesar solicitudes JSON y formularios
app.use(cors());
app.use(express.json()); 

// Rutas principales
app.use('/api/usuarios', usuarioRoutes); // Ruta modular para todo lo de usuarios 

// Ruta de para probar que todo esté funcionando
app.get('/', (req, res) => {
  res.send('API Salud Huellitas Web funcionando');
});

// Levanta el servidor a el puerto definido para poder probar en el postman
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

app.use('/api/mascotas', mascotaRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/historial', historialRoutes); 
app.use('/api/especies', especieRoutes);
 
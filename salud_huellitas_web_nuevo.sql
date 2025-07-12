-- CREAR USUARIO
CREATE USER 'DanielMartinez'@'localhost' IDENTIFIED BY 'ADSO';
CREATE DATABASE SaludHuellitas;
GRANT ALL PRIVILEGES ON Salud_huellitas_web.* TO 'Daniel_Martinez'@'localhost';
FLUSH PRIVILEGES;
-- Crear base de datos
DROP DATABASE IF EXISTS Salud_huellitas_web;
CREATE DATABASE Salud_huellitas_web;
USE Salud_huellitas_web;

-- ROLES
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (id, nombre) VALUES 
(1, 'admin'), 
(3, 'cliente');

-- USUARIOS 
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INT,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);
-- ESPECIE 

CREATE TABLE especies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO especies (nombre) VALUES 
('Perro'),
('Gato'),
('Conejo'),
('Hámster'),
('Tortuga'),
('Ave'),
('Pez'),
('Hurón');

-- MASCOTAS
CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie_id INT,
    usuario_id INT,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (especie_id) REFERENCES especies(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- SUCURSALES
CREATE TABLE sucursales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);

INSERT INTO sucursales (nombre, direccion) VALUES 
('Sucursal Cañaveral', 'Carrera 25 #30-45, Cañaveral'),
('Sucursal Cabecera', 'Calle 48 #36-22, Cabecera'),
('Sucursal Provenza', 'Carrera 27 #105-18, Provenza'),
('Sucursal Girardot', 'Calle 33 #22-40, Girardot'),
('Sucursal Centro', 'Carrera 15 #34-50, Centro Bucaramanga');

-- SERVICIOS
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO servicios (nombre) VALUES
('Vacunación'), ('Desparasitación'), ('Consulta General'), ('Radiografía'),
('Cirugía menor'), ('Limpieza dental'), ('Hospitalización'), ('Ecografía'),
('Control prenatal'), ('Certificado de viaje'), ('Microchip e identificación'),
('Esterilización'), ('Análisis de laboratorio'), ('Consulta etológica');

-- CITAS 
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT,
    sucursal_id INT,
    servicio_id INT,
    fecha DATE,
    hora TIME,
    motivo VARCHAR(255),
    estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);

-- HISTORIAL CITAS
CREATE TABLE historial_citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    observaciones TEXT,
    tratamiento TEXT,
    FOREIGN KEY (cita_id) REFERENCES citas(id)
);

-- SUSCRIPCIONES 
CREATE TABLE suscripciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  mascota_id INT NULL,
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  plan VARCHAR(100) NOT NULL,
  fecha_inicio DATE NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL
);

-- EJEMPLOS INSERT

-- INSERT MASCOTAS
INSERT INTO mascotas (nombre, especie_id, usuario_id)
VALUES 
('Firulais', 1, 3),
('Mishi', 2, 3),
('Luna', 2, 3),
('Rocky', 1, 3),
('Toby', 1, 3),
('Nina', 2, 3),
('Pelusa', 3, 3);

INSERT INTO citas (mascota_id, sucursal_id, servicio_id, fecha, hora, motivo)
VALUES
(1, 1, 1, '2025-07-15', '10:30:00', 'Vacuna anual'),
(3, 2, 2, '2025-07-21', '14:00:00', 'Desparasitación programada'),
(4, 1, 5, '2025-07-22', '13:30:00', 'Cirugía menor en la pata trasera'),
(5, 1, 8, '2025-07-23', '16:15:00', 'Ecografía de control'),
(6, 2, 10, '2025-07-24', '09:45:00', 'Certificado de viaje'),
(7, 1, 12, '2025-07-25', '11:00:00', 'Esterilización programada');

-- Plan básico para Firulais
INSERT INTO suscripciones (usuario_id, mascota_id, direccion, telefono, plan, fecha_inicio)
VALUES (3, 1, 'Calle 89 #12-34', '3001234567', 'Plan Básico', CURDATE());

-- Plan premium para Mishi
INSERT INTO suscripciones (usuario_id, mascota_id, direccion, telefono, plan, fecha_inicio)
VALUES (3, 2, 'Calle 89 #12-34', '3001234567', 'Plan Premium', CURDATE());

-- Plan familiar sin mascota específica
INSERT INTO suscripciones (usuario_id, direccion, telefono, plan, fecha_inicio)
VALUES (3, 'Calle 89 #12-34', '3001234567', 'Plan Familiar', CURDATE());

-- HISTORIAL 
INSERT INTO historial_citas (cita_id, observaciones, tratamiento)
VALUES
(1, 'Mascota en buen estado, vacunación exitosa', 'Continuar con el esquema de vacunación.'),
(2, 'Tos leve, sin fiebre', 'Jarabe expectorante por 5 días.'),
(3, 'Fractura en pata delantera detectada', 'Reposo absoluto y antiinflamatorio.'),
(4, 'Placa dental con sarro', 'Limpieza profunda realizada.'),
(5, 'Síntomas de fiebre controlados', 'Hospitalización preventiva terminada.');




-- POST http://localhost:3000/api/usuarios/registro
-- {
--  "nombre": "Administrador General",
--  "correo": "admin@huellitas.com",
--  "contrasena": "Admin123.",
--  "rol_id": 1
-- }

USE Salud_huellitas_web;

-- Tabla roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);
select * from usuarios;

-- Tabla especies
CREATE TABLE especies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla mascotas
CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie_id INT,
    usuario_id INT,
    FOREIGN KEY (especie_id) REFERENCES especies(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla sucursales
CREATE TABLE sucursales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);

-- Tabla empleados_sucursal (M:N)
CREATE TABLE empleados_sucursal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    sucursal_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
);

-- Tabla citas
CREATE TABLE citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT,
    sucursal_id INT,
    fecha DATE,
    hora TIME,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id),
    FOREIGN KEY (sucursal_id) REFERENCES sucursales(id)
);
ALTER TABLE citas ADD estado ENUM('pendiente', 'aprobada', 'rechazada') DEFAULT 'pendiente';

select * from citas;
SELECT c.id, c.fecha, c.hora, m.nombre AS mascota, s.nombre AS sucursal, m.usuario_id
FROM citas c
LEFT JOIN mascotas m ON c.mascota_id = m.id
LEFT JOIN sucursales s ON c.sucursal_id = s.id;

-- Tabla servicios
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);
select * from servicios;

-- Tabla cita_servicio (M:N)
CREATE TABLE cita_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    servicio_id INT,
    FOREIGN KEY (cita_id) REFERENCES citas(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);
select * from cita_servicio;

-- Tabla historial_citas
CREATE TABLE historial_citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT,
    observaciones TEXT,
    tratamiento TEXT,
    FOREIGN KEY (cita_id) REFERENCES citas(id)
    );
    ALTER TABLE citas
ADD COLUMN servicio_id INT AFTER mascota_id,
ADD FOREIGN KEY (servicio_id) REFERENCES servicios(id);

    select * from historial_citas;
    
    -- suscripcion 
DROP TABLE IF EXISTS suscripciones;

CREATE TABLE suscripciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT, -- FK directa al usuario (opcional si ya tienes relación por mascota)
  mascota_id INT,
  direccion VARCHAR(255),
  telefono VARCHAR(20),
  plan VARCHAR(100) NOT NULL, -- puede ser: Básico, Básico Familiar, Premium, Premium Familiar
  fecha_inicio DATE NOT NULL ,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
);

ALTER TABLE suscripciones
MODIFY mascota_id INT NULL,
ADD CONSTRAINT fk_mascota
FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE SET NULL;
select * from usuarios;
select * from suscripciones;
select * from mascotas;
select * from servicios;
    
    ALTER TABLE usuarios ADD COLUMN rol ENUM('admin', 'empleado', 'cliente') DEFAULT 'cliente';

    -- insert --
    
-- Insertar roles
INSERT INTO roles (nombre) VALUES ('admin'), ('empleado'), ('cliente');
DELETE FROM roles WHERE nombre = 'empleado';
-- Verifica primero los IDs actuales
SELECT * FROM roles;
DROP TABLE roles;
UPDATE usuarios SET rol_id = 2 WHERE rol_id = 3;


-- Supongamos que 'empleado' tiene id = 2
DELETE FROM roles WHERE id = 2;
-- Cambiar empleados a admin (rol_id = 1)
UPDATE usuarios SET rol_id = 1 WHERE rol_id = 2;
UPDATE roles SET id = 2 WHERE id = 3;



select * from roles;
-- Insertar usuarios
INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES
('Administrador General', 'admin@huellitas.com', 'admin123', 1),
('Carlos Empleado', 'empleado1@huellitas.com', 'empleado123', 2),
('Laura Cliente', 'cliente1@huellitas.com', 'cliente123', 3);

INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES
('Administrador General', 'admin_1@huellitas.com', 'Admin123.', 1);


-- Insertar especies
INSERT INTO especies (nombre) VALUES ('Perro'), ('Gato'), ('Conejo');

-- Insertar mascotas
INSERT INTO mascotas (nombre, especie_id, usuario_id) VALUES
('Firulais', 1, 3),
('Mishi', 2, 3);

-- Insertar sucursales
INSERT INTO sucursales (nombre, direccion) VALUES
('Sucursal Norte', 'Calle 123 #45-67'),
('Sucursal Sur', 'Carrera 89 #10-22');

-- Insertar empleados en sucursales
INSERT INTO empleados_sucursal (usuario_id, sucursal_id) VALUES
(2, 1),
(2, 2);

-- Insertar servicios
INSERT INTO servicios (nombre) VALUES
('Vacunación'),
('Desparasitación'),
('Consulta General'),
('Radiografía'),
('Cirugía menor'),
('Limpieza dental'),
('Hospitalización'),
('Ecografía'),
('Control prenatal'),
('Certificado de viaje'),
('Microchip e identificación'),
('Esterilización'),
('Análisis de laboratorio'),
('Consulta etológica');

-- Insertar cita_servicio
INSERT INTO cita_servicio (cita_id, servicio_id) VALUES
(1, 1),
(1, 3),
(2, 2);

-- Insertar historial de citas
INSERT INTO historial_citas (cita_id, observaciones, tratamiento) VALUES
(1, 'Buena salud general. Aplicada vacuna.', 'Vacuna pentavalente.'),
(2, 'Gato con parásitos intestinales.', 'Desparasitación oral.');

select * from usuarios;
select * from mascotas;
select * from citas;
select * from servicios;
select * from especies;
SELECT * FROM citas;
SELECT * FROM sucursales;




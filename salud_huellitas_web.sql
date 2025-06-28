
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
select * from citas;
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
    select * from historial_citas;
    
    ALTER TABLE usuarios ADD COLUMN rol ENUM('admin', 'empleado', 'cliente') DEFAULT 'cliente';

    -- insert --
    
-- Insertar roles
INSERT INTO roles (nombre) VALUES ('admin'), ('empleado'), ('cliente');

-- Insertar usuarios
INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES
('Administrador General', 'admin@huellitas.com', 'admin123', 1),
('Carlos Empleado', 'empleado1@huellitas.com', 'empleado123', 2),
('Laura Cliente', 'cliente1@huellitas.com', 'cliente123', 3);

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
('Consulta General');

-- Insertar citas
INSERT INTO citas (mascota_id, sucursal_id, fecha, hora) VALUES
(1, 1, '2025-06-10', '10:00:00'),
(2, 2, '2025-06-11', '11:30:00');

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




create schema api_general;
use api_general;
SET time_zone = '-05:00';

select * from users;

CREATE TABLE estudiantes (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    universidad VARCHAR(100),
    carrera VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE estudiantes;

DELETE FROM users WHERE id_user = 19;

INSERT INTO estudiantes (nombre, correo, universidad, carrera)  
VALUES ('Juan Pérez', 'juan.perez@email.com', 'Universidad Nacional', 'Ingeniería de Sistemas'),
('María González', 'maria.gonzalez@email.com', 'Universidad Tecnológica', 'Administración de Empresas'),
('Carlos López', 'carlos.lopez@email.com', 'Instituto Politécnico', 'Ingeniería Electrónica'),
('Ana Ramírez', 'ana.ramirez@email.com', 'Universidad Central', 'Medicina');

CREATE TABLE temarios (
    id_temario INT AUTO_INCREMENT PRIMARY KEY,
    materia VARCHAR(100) NOT NULL,
    tema VARCHAR(255) NOT NULL,
    descripcion TEXT,
    semana INT NOT NULL
);

ALTER TABLE temarios  
CHANGE COLUMN id id_temario INT AUTO_INCREMENT;


INSERT INTO temario (materia, tema, descripcion, semana) VALUES
("Estructuras de Datos", "Introducción a Estructuras de Datos", "Conceptos básicos y tipos de estructuras de datos.", 1),
("Estructuras de Datos", "Listas Enlazadas", "Definición, implementación y aplicaciones de listas enlazadas.", 2),
("Bases de Datos", "Introducción a Bases de Datos", "Definición, importancia y modelos de bases de datos.", 1),
("Programación en Java", "Introducción a Java", "Historia y características del lenguaje.", 1),
("Redes de Computadoras", "Introducción a Redes", "Conceptos básicos, historia y evolución de las redes.", 1),
("Inteligencia Artificial", "Historia de la IA", "Evolución y aplicaciones de la inteligencia artificial.", 1);

ALTER TABLE temario 
RENAME TO temarios;

create table users (
  id_user int primary key auto_increment not null,
  fullname varchar(200) NOT NULL,
  user varchar(200) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  state_id int,
  foreign key (state_id) references states(id_state)
);

-- ja
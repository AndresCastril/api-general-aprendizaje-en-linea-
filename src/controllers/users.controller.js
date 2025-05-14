import { pool } from "../libs/db.js";
import { errorHandler } from "../helpers/errorHandler.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"; // Importar la librería jsonwebtoken

const JWT_SECRET = "andres123.54"; // Define una clave secreta para firmar el token
const JWT_EXPIRATION = "1m"; // Establece una expiración para el token (1 hora en este caso)

const saltRounds = 10; 

export const getUserById = (req, res) => {
  const { id_user } = req.params;

  pool.query(`SELECT * FROM users WHERE id_user = ?`, [id_user])
    .then(([rows]) => {
      res.json({ data: rows });
    })
    .catch(error => {
      errorHandler(res, 500, "Error al obtener la información del usuario", error);
    });
};

export const getAllUsers = (req, res) => {
  pool.query(`SELECT * FROM users`)
    .then(([rows]) => {
      res.json({ data: rows });
    })
    .catch(error => {
      errorHandler(res, 500, "Error al obtener los usuarios", error);
    });
};


export const createUser = async (req, res) => {
  const { name, email, user, password } = req.body;

  try {

    const [existingUser] = await pool.query(`SELECT * FROM users WHERE email = ? OR user = ?`, [email, user]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El usuario o correo ya están registrados." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      `INSERT INTO users (fullname, user, email, password, state_id) VALUES (?, ?, ?, ?, ?)`,
      [name, user, email, hashedPassword, 1]
    );

    res.json({ message: "Usuario creado exitosamente", userId: result.insertId });


  } catch (error) {
    errorHandler(res, 500, "Error al crear el usuario", error);
  }
};




export const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return errorHandler(res, 404, "Usuario no encontrado.");
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return errorHandler(res, 401, "Contraseña incorrecta.");
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id_user: user.id_user, email: user.email }, // Información que quieres incluir en el token
      JWT_SECRET, // La clave secreta para firmar el token
      { expiresIn: JWT_EXPIRATION } // Configuración de expiración
    );

    // Enviar el token en la respuesta
    res.json({ token });

  } catch (error) {
    errorHandler(res, 500, "Error al verificar usuario", error);
  }
};

export const checkToken = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token de Authorization

  if (!token) {
    return res.status(403).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Si el token está expirado o no es válido
      return res.status(401).json({ error: "Token no válido o expirado" });
    }

    // Si el token es válido, decodificado con éxito
    console.log(decoded); // Aquí puedes ver la información decodificada en la consola

    res.json({ message: "Token válido", userData: decoded });
  });
};

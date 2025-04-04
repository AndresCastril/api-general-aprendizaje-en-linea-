import { pool } from "../libs/db.js";
import { errorHandler } from "../helpers/errorHandler.js";
import bcrypt from "bcrypt";

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

      res.json({ token: btoa(user.email) }); // Se devuelve el token en base64 (mejorable en el futuro)
  } catch (error) {
      errorHandler(res, 500, "Error al verificar usuario", error);
  }
};

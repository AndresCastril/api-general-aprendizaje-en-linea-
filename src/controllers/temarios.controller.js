import { pool } from "../libs/db.js";
import { errorHandler } from "../helpers/errorHandler.js";

export const getAll = (req, res) => {
  pool.query("SELECT * FROM temarios")
    .then((data) => {
      const info = data[0];
      res.json({
        status: 0,
        message: "",
        data: info
      });
    })
    .catch(error => {
      errorHandler(res, 404, "Error al obtener la información de los temarios", error);
    });
};

export const getTemarioById = (req, res) => {
  const { idTemario } = req.params;
  pool.query(`SELECT * FROM temarios WHERE id_temario = ${idTemario}`)
    .then((data) => {
      const info = data[0];
      res.json({
        status: 0,
        message: "",
        data: info[0]
      });
    })
    .catch(error => {
      errorHandler(res, 404, "Error al obtener la información de los temarios", error);
    });
};


export const addTemario = (req, res) => {
  const { materia, tema, descripcion, semana } = req.body;

  if (!materia || !tema || !descripcion || !semana) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  pool.query(
    "INSERT INTO temarios (materia, tema, descripcion, semana) VALUES (?, ?, ?, ?)",
    [materia, tema, descripcion, semana]
  )
    .then((result) => {
      res.status(201).json({ 
        status: 0, 
        message: "Tema agregado correctamente", 
        id: result[0].insertId 
      });
    })
    .catch(error => {
      errorHandler(res, 500, "Error al agregar el temario", error);
    });
};

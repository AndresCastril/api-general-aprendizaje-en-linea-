import { pool } from "../libs/db.js";

import { errorHandler } from "../helpers/errorHandler.js";

export const getAll = (req, res) => {
  pool.query('select * from estudiantes')
  .then((data) => {
    const info = data[0]
    res.json({
      status: 0,
      message: '',
      data: info
    })
  })
  .catch(error => {
    errorHandler(res, 404, "Error al obtener la informacion de los estudiantes", error)
  })
}

export const getEstudianteById = (req, res) => {
  const { idEstudiante } = req.params
  pool.query(`select * from estudiantes where id_estudiante = ${idEstudiante}`)
  .then((data) => {
    const info = data[0]
    res.json({
      status: 0,
      message: '',
      data: info[0]
    })
  })
  .catch(error => {
    errorHandler(res, 404, "Error al obtener la informacion de los estudiantes", error)
  })
}

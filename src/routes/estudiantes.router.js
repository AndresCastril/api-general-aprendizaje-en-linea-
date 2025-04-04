import express from "express";

import { getAll, getEstudianteById } from "../controllers/estudiantes.controller.js";

const router = express.Router()

router.get('/:id_estudiante', getEstudianteById)
router.get('/', getAll)

export default router;


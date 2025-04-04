import express from "express";
import { getAll, getTemarioById, addTemario } from "../controllers/temarios.controller.js";

const router = express.Router();

router.get('/:id_temario', getTemarioById);
router.get('/', getAll);
router.post('/', addTemario);

export default router;

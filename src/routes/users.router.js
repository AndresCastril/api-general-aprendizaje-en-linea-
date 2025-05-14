import express from "express";
import { getUserById, createUser, verifyUser, getAllUsers } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/:id_user", getUserById);
router.get("/", getAllUsers);
router.post("/create", createUser);
router.post("/", verifyUser);

export default router;


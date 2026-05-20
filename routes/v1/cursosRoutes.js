import express from "express";
import CursosController from "../../controllers/cursosController.js";

const router = express.Router();
const cursosController = new CursosController();

router.get("/cursos", cursosController.findAll.bind(cursosController));
router.get("/cursos/:cursoId", cursosController.findById.bind(cursosController));
router.post("/cursos", cursosController.create.bind(cursosController));
router.put("/cursos/:cursoId", cursosController.update.bind(cursosController));
router.delete("/cursos/:cursoId", cursosController.destroy.bind(cursosController));

export { router };
import express from "express";
import CursosController from "../../controllers/cursosController.js";
import cursosFindAllValidation from "../../validators/cursosFindAll.validation.js";
import cursosFindAllTransform from "../../transforms/cursosFindAll.transform.js";

const router = express.Router();
const cursosController = new CursosController();

router.get("/cursos", [cursosFindAllValidation, cursosFindAllTransform], cursosController.findAll.bind(cursosController));
router.get("/cursos/:cursoId", cursosController.findById.bind(cursosController));
router.post("/cursos", cursosController.create.bind(cursosController));
router.put("/cursos/:cursoId", cursosController.update.bind(cursosController));
router.delete("/cursos/:cursoId", cursosController.delete.bind(cursosController));

export { router };
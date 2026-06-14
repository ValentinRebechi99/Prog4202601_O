import express from "express";
import CursosController from "../../controllers/cursosController.js";
import cursosFindAllValidation from "../../validators/cursos/cursosFindAll.validation.js";
import cursosFindAllTransform from "../../transforms/cursos/cursosFindAll.transform.js";
import cursosCreateValidation from "../../validators/cursos/cursosCreate.validation.js";
import cursosUpdateValidation from "../../validators/cursos/cursosUpdate.validation.js";
import cursosDeleteValidation from "../../validators/cursos/cursosDelete.validation.js";

const router = express.Router();
const cursosController = new CursosController();

router.get("/cursos", [cursosFindAllValidation, cursosFindAllTransform], cursosController.findAll.bind(cursosController));
router.post("/cursos", cursosCreateValidation, cursosController.create.bind(cursosController));
router.put("/cursos/:cursoId", cursosUpdateValidation, cursosController.update.bind(cursosController));
router.delete("/cursos/:cursoId", cursosDeleteValidation ,cursosController.delete.bind(cursosController));

export { router };
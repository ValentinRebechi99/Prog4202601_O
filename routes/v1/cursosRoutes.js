import express from "express";
import CursosController from "../../controllers/cursosController.js";

const router = express.Router();

const cursosController = new CursosController();

router.get("/cursos", cursosController.findAll);

router.get("/cursos/:cursoId", cursosController.findById);

router.post("/cursos", cursosController.create);

router.put("/cursos/:cursoId", cursosController.update);

router.delete("/cursos/:cursoId", cursosController.destroy);

export { router };
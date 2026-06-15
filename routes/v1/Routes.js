import express from "express";
//imports cursos
import CursosController from "../../controllers/cursosController.js";
import cursosFindAllValidation from "../../validators/cursos/cursosFindAll.validation.js";
import cursosFindAllTransform from "../../transforms/cursos/cursosFindAll.transform.js";
import cursosCreateValidation from "../../validators/cursos/cursosCreate.validation.js";
import cursosUpdateValidation from "../../validators/cursos/cursosUpdate.validation.js";
import cursosDeleteValidation from "../../validators/cursos/cursosDelete.validation.js";
//imports estudiantes
import EstudiantesController from "../../controllers/estudiantesController.js";
import estudiantesFindAllValidation from "../../validators/estudiantes/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantes/estudiantesFindAll.transform.js";
import estudiantesCreateValidation from "../../validators/estudiantes/estudiantesCreate.validation.js";
import estudiantesUpdateValidation from "../../validators/estudiantes/estudiantesUpdate.validation.js";
import estudiantesDeleteValidation from "../../validators/estudiantes/estudiantesDelete.validation.js";
//imports inscripciones
import InscripcionesController from "../../controllers/inscripcionesController.js";
import inscripcionesFindAllValidation from "../../validators/inscripciones/inscripcionesFindAll.validation.js";
import inscripcionesFindAllTransform from "../../transforms/inscripciones/inscripcionesFindAll.transform.js";
import inscripcionesCreateValidation from "../../validators/inscripciones/inscripcionesCreate.validation.js";
import inscripcionesUpdateValidation from "../../validators/inscripciones/inscripcionesUpdate.validation.js";
import inscripcionesDeleteValidation from "../../validators/inscripciones/inscripcionesDelete.validation.js";

const router = express.Router();
const cursosController = new CursosController();

//rutas cursos
router.get("/cursos", [cursosFindAllValidation, cursosFindAllTransform], cursosController.findAll.bind(cursosController));
router.post("/cursos", cursosCreateValidation, cursosController.create.bind(cursosController));
router.put("/cursos/:cursoId", cursosUpdateValidation, cursosController.update.bind(cursosController));
router.delete("/cursos/:cursoId", cursosDeleteValidation ,cursosController.delete.bind(cursosController));

//rutas Estudiantes
const estudiantesController = new EstudiantesController();

router.get("/estudiantes", [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.findAll.bind(estudiantesController));
router.post("/estudiantes", estudiantesCreateValidation, estudiantesController.create.bind(estudiantesController));
router.put("/estudiantes/:estudianteId", estudiantesUpdateValidation, estudiantesController.update.bind(estudiantesController));
router.delete("/estudiantes/:estudianteId", estudiantesDeleteValidation ,estudiantesController.delete.bind(estudiantesController));

//rutas inscripciones
const inscripcionesController = new InscripcionesController();

router.get("/inscripciones", [inscripcionesFindAllValidation, inscripcionesFindAllTransform], inscripcionesController.findAll.bind(inscripcionesController));
router.post("/inscripciones", inscripcionesCreateValidation, inscripcionesController.create.bind(inscripcionesController));
router.put("/inscripciones/:inscripcionId", inscripcionesUpdateValidation, inscripcionesController.update.bind(inscripcionesController));
router.delete("/inscripciones/:inscripcionId", inscripcionesDeleteValidation ,inscripcionesController.delete.bind(inscripcionesController));


export { router };
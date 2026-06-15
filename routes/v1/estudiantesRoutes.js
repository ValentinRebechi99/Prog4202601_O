import express from "express";

import EstudiantesController from "../../controllers/estudiantesController.js";
import estudiantesFindAllValidation from "../../validators/estudiantes/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantes/estudiantesFindAll.transform.js";
import estudiantesCreateValidation from "../../validators/estudiantes/estudiantesCreate.validation.js";
import estudiantesUpdateValidation from "../../validators/estudiantes/estudiantesUpdate.validation.js";
import estudiantesDeleteValidation from "../../validators/estudiantes/estudiantesDelete.validation.js";

const router = express.Router();

const estudiantesController = new EstudiantesController();

router.get("/estudiantes", [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.findAll.bind(estudiantesController));
router.post("/estudiantes", estudiantesCreateValidation, estudiantesController.create.bind(estudiantesController));
router.put("/estudiantes/:estudianteId", estudiantesUpdateValidation, estudiantesController.update.bind(estudiantesController));
router.delete("/estudiantes/:estudianteId", estudiantesDeleteValidation ,estudiantesController.delete.bind(estudiantesController));

export { router };
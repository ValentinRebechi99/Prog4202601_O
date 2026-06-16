import express from "express";
import passport from "passport";

import EstudiantesController from "../../controllers/estudiantesController.js";
import estudiantesFindAllValidation from "../../validators/estudiantes/estudiantesFindAll.validation.js";
import estudiantesFindAllTransform from "../../transforms/estudiantes/estudiantesFindAll.transform.js";
import estudiantesCreateValidation from "../../validators/estudiantes/estudiantesCreate.validation.js";
import estudiantesUpdateValidation from "../../validators/estudiantes/estudiantesUpdate.validation.js";
import estudiantesDeleteValidation from "../../validators/estudiantes/estudiantesDelete.validation.js";

const router = express.Router();

const estudiantesController = new EstudiantesController();

router.get("/estudiantes", passport.authenticate('jwt', { session: false }), [estudiantesFindAllValidation, estudiantesFindAllTransform], estudiantesController.findAll.bind(estudiantesController));
router.post("/estudiantes", passport.authenticate('jwt', { session: false }), estudiantesCreateValidation, estudiantesController.create.bind(estudiantesController));
router.put("/estudiantes/:estudianteId", passport.authenticate('jwt', { session: false }), estudiantesUpdateValidation, estudiantesController.update.bind(estudiantesController));
router.delete("/estudiantes/:estudianteId", passport.authenticate('jwt', { session: false }), estudiantesDeleteValidation ,estudiantesController.delete.bind(estudiantesController));

export { router };
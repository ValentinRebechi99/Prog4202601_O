import express from "express";
import passport from "passport";

import InscripcionesController from "../../controllers/inscripcionesController.js";
import inscripcionesFindAllValidation from "../../validators/inscripciones/inscripcionesFindAll.validation.js";
import inscripcionesFindAllTransform from "../../transforms/inscripciones/inscripcionesFindAll.transform.js";
import inscripcionesCreateValidation from "../../validators/inscripciones/inscripcionesCreate.validation.js";
import inscripcionesUpdateValidation from "../../validators/inscripciones/inscripcionesUpdate.validation.js";
import inscripcionesDeleteValidation from "../../validators/inscripciones/inscripcionesDelete.validation.js";

const router = express.Router();
const inscripcionesController = new InscripcionesController();

router.get("/inscripciones", passport.authenticate('jwt', { session: false }), [inscripcionesFindAllValidation, inscripcionesFindAllTransform], inscripcionesController.findAll.bind(inscripcionesController));
router.post("/inscripciones", passport.authenticate('jwt', { session: false }), inscripcionesCreateValidation, inscripcionesController.create.bind(inscripcionesController));
router.put("/inscripciones/:inscripcionId", passport.authenticate('jwt', { session: false }), inscripcionesUpdateValidation, inscripcionesController.update.bind(inscripcionesController));
router.delete("/inscripciones/:inscripcionId", passport.authenticate('jwt', { session: false }), inscripcionesDeleteValidation ,inscripcionesController.delete.bind(inscripcionesController));


export { router };
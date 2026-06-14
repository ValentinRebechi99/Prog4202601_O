import { body, param, validationResult } from 'express-validator';
const cursosUpdateValidation = [
    param('cursoId').notEmpty().withMessage("el cursoId no puede esta vacio").isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    body('nombre').notEmpty().withMessage("el nombre no puede esta vacio"),
    body('descripcion').notEmpty().withMessage("el nombre no puede estar vacio"),
    body('fechaInicio').notEmpty().withMessage("la fecha no puede estar vacia").isISO8601().withMessage("la fecha debe estar en formato ISO8601"),
    body('cantidadHoras').notEmpty().withMessage("la cantidadHoras no puede estar vacia").isInt({min:1, max:2147483647}).withMessage("la cantidad de horas debe ser un numero entre 1 y 2147483647"),
    body('inscriptosMaximos').notEmpty().withMessage('inscriptosMax no puede estar vacio').isInt({min: 1, max:32767}).withMessage('nombre debe ser un entero entre 1 y 32767').toInt(),
    body('idCursoEstado').notEmpty().withMessage('idCursoEstado no puede estar vacio').isInt({min: 1, max:4}).withMessage('idCursoEstado debe ser un entero entre 1 y 4').toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default cursosUpdateValidation;

import { body, param, validationResult } from 'express-validator';
const estudiantesUpdateValidation = [
    param('estudianteId').notEmpty().withMessage("el estudianteId no puede esta vacio").isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    body('documento').notEmpty().withMessage("el documento no puede esta vacio"),
    body('apellido').notEmpty().withMessage("el apellido no puede estar vacio"),
    body('nombres').notEmpty().withMessage("los nombres no pueden estar vacios"),
    body('email').notEmpty().withMessage("el email no puede estar vacio").isEmail().withMessage('email debe ser una dirección de correo válida'),
    body('fechaNacimiento').notEmpty().withMessage("la fecha de nacimiento no puede estar vacia").isISO8601().withMessage("la fecha de nacimiento debe estar en formato ISO8601"),
    body('activo').notEmpty().withMessage('activo no puede estar vacio').isInt({min: 0, max:1}).withMessage('activo debe ser un entero entre 0 y 1').toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default estudiantesUpdateValidation;

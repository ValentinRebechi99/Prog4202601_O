import { body, param, validationResult } from 'express-validator';
const inscripcionesUpdateValidation = [
    param('idInscripcion').notEmpty().withMessage('la Id de inscripcion no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    body('idCurso').notEmpty().withMessage('la Id de curso no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    body('idEstudiante').notEmpty().withMessage('la Id de estudiante no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    body('fechaHoraInscripcion').notEmpty().withMessage('la fecha no puede estar vacia').isISO8601().withMessage('la fecha debe estar en formato ISO8601'),
    body('idInscripcionEstado').notEmpty().withMessage('la Id de estado no puede estar vacia').isInt({ min: 1,max:2 }).withMessage('la Id debe ser un numero').toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default inscripcionesUpdateValidation;

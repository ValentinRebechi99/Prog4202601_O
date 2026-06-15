import { query, validationResult } from 'express-validator';
const inscripcionesFindAllValidation = [
    query('idInscripcion').optional().notEmpty().withMessage('la Id de Inscripcion no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    query('idCurso').optional().notEmpty().withMessage('la Id de curso no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    query('idEstudiante').optional().notEmpty().withMessage('la Id de estudiante no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    query('fechaHoraInscripcion').optional().notEmpty().withMessage('la fecha no puede estar vacia').isISO8601().withMessage('la fecha debe estar en formato ISO8601'),
    query('idInscripcionEstado').optional().notEmpty().withMessage('la id de inscripcion no puede estar vacia').isInt({min: 1, max:2 }).withMessage('la Id debe ser un numero').toInt(),
    query('limit')
        .optional()
        .isInt({ min: 0 }).withMessage('limit debe ser un entero no negativo')
        .toInt(),
    query('offset')
        .optional()
        .isInt({ min: 0 }).withMessage('offset debe ser un entero no negativo')
        .toInt(),
    query('order')
        .optional()
        .isIn(['idCurso', 'nombre', 'descripcion', 'fechaInicio', 'cantidadHoras', 'inscriptosMax', 'idCursoEstado']).withMessage('order debe ser uno de los siguientes valores: idCurso, nombres, cantidadHoras, inscriptosMax, idCursoEstado, fechaInicio, descripcion'),
    query('asc')
        .optional()
        .isBoolean().withMessage('asc debe ser un valor booleano'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default inscripcionesFindAllValidation;
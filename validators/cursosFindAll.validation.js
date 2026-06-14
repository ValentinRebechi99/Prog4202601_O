import { query, validationResult } from 'express-validator';
const cursosFindAllValidation = [
    query('idCurso').optional().notEmpty().withMessage('la Id no puede estar vacia').isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    query('nombre').optional().notEmpty().withMessage('el nombre no puede estar vacio').isString().withMessage('nombre debe ser un string'),
    query('descripcion').optional().notEmpty().withMessage('la descripcion no puede estar vacia').isString().withMessage('la descripcion debe ser un string'),
    query('fechaInicio').optional().notEmpty().withMessage('la fecha no puede estar vacia').isISO8601().withMessage('la fecha debe estar en formato ISO8601'),
    query('cantidadHoras').optional().notEmpty().withMessage('la cantidadHoras no puede estar vacia').isInt({min: 1, max:2147483647 }).withMessage('la cantidadHoras debe ser un numero').toInt(),
    query('inscriptosMax').optional().notEmpty().withMessage('inscriptosMax no puede estar vacio').isInt({min: 1, max:32767}).withMessage('nombre debe ser un entero entre 1 y 32767').toInt(),
    query('idCursoEstado').optional().notEmpty().withMessage('idCursoEstado no puede estar vacio').isInt({min: 1, max:4}).withMessage('idCursoEstado debe ser un entero entre 1 y 4').toInt(),
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

export default cursosFindAllValidation;
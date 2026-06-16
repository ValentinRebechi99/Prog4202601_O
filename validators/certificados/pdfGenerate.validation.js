import { body, validationResult } from 'express-validator';
const pdfGenerateValidation = [
    body('nombre').notEmpty().withMessage('El nombre del alumno no puede estar vacio'),
    body('apellido').notEmpty().withMessage('El apellido del alumno no puede estar vacio'),
    body('dni').notEmpty().withMessage('El dni no puede estar vacio'),
    body('curso').notEmpty().withMessage('El nombre del curso no puede estar vacio'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default pdfGenerateValidation;

import { param, validationResult } from 'express-validator';
const estudiantesDeleteValidation = [
    param('estudianteId').notEmpty().withMessage("el id no puede esta vacio").isInt({ min: 1,max:2147483647 }).withMessage('la Id debe ser un numero').toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default estudiantesDeleteValidation;

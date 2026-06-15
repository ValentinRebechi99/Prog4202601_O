import express from 'express';
import passport from 'passport';
import AuthController from './../../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/auth/login', authController.login);
router.post('/auth/validate', passport.authenticate('jwt', { session: false }), authController.checkSession);

export { router };
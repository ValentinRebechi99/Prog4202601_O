import express from "express";
import passport from 'passport';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const requireJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            const rutaAlError = path.join(__dirname, '..', '..', 'errors', '401.html');
            return res.status(401).sendFile(rutaAlError);
        }

        req.user = user;
        next();
    })(req, res, next);
};

router.get("/contacto.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'contacto.html'));
});

router.get("/cursos-mod.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos-mod.html'));
});

router.get("/cursos-nuevo.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos-nuevo.html'));
});

router.get("/cursos.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos.html'));
});

router.get("/estudiantes-nuevo.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes-nuevo.html'));
});

router.get("/estudiantes-mod.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes-mod.html'));
});

router.get("/estudiantes.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes.html'));
});

router.get("/inscripciones.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'inscripciones.html'));
});

router.get("/inscripciones-nuevo.html",requireJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'inscripciones-nuevo.html'));
});

router.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'login.html'));
}); 

export { router };
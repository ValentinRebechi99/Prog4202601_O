import express from "express";
import passport from 'passport';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/contacto.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'contacto.html'));
});

router.get("/cursos-mod.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos-mod.html'));
});

router.get("/cursos-nuevo.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos-nuevo.html'));
});

router.get("/cursos.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'cursos.html'));
});

router.get("/estudiantes-nuevo.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes-nuevo.html'));
});

router.get("/estudiantes-mod.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes-mod.html'));
});

router.get("/estudiantes.html",passport.authenticate('jwt', { session: false }) , (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'estudiantes.html'));
});

router.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'login.html'));
});

export { router };
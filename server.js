import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as v1RouterCursos } from './routes/v1/cursosRoutes.js';
import { router as v1RouterEstudiantes } from './routes/v1/estudiantesRoutes.js';
import { router as v1RouterInscripciones } from './routes/v1/inscripcionesRoutes.js';
import { router as v1RouterAuth } from "./routes/v1/authRoutes.js";
import { router as v1RouterViews } from "./routes/v1/viewsRoutes.js"

import helmet from 'helmet';
import passport from "passport";
import { localStrategy, jwtStrategy } from "./config/passport.js";

const app = express();

// Recrear __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: ['http://localhost:3000'], // Dominio permitido
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/", v1RouterAuth);
app.use("/", v1RouterViews);
app.use("/", v1RouterCursos);
app.use("/", v1RouterEstudiantes);
app.use("/", v1RouterInscripciones);


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
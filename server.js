import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { router as v1Router } from './routes/v1/Routes.js';

const app = express();

// Recrear __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname)); 

app.use(cors());
app.use("/", v1Router);

const rutaArchivo = path.join(__dirname, 'estudiantes.json');

app.post('/api/guardar-estudiante', (req, res) => {
    const nuevoEstudiante = req.body;

    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
        let estudiantes = [];

        if (!err && data) {
            try {
                estudiantes = JSON.parse(data);
            } catch (e) {
                console.error("Error al parsear el JSON existente, se reescribirá.");
            }
        }

        estudiantes.push(nuevoEstudiante);

        fs.writeFile(rutaArchivo, JSON.stringify(estudiantes, null, 2), 'utf8', (errEscribir) => {
            if (errEscribir) {
                console.error(errEscribir);
                return res.status(500).json({ error: 'No se pudo escribir en el archivo.' });
            }
            
            res.json({ mensaje: '¡Estudiante guardado con éxito en estudiantes.json!' });
        });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
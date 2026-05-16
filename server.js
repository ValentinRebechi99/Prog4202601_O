const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static(__dirname)); 


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


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
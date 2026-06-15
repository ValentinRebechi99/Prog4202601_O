import InscripcionService from "../services/inscripciones.service";

class InscripcionesController {
    constructor() {
        this.servicio = new InscripcionService
    }

    findAll = async (req, res) => {
        try {
            const { filter, limit, offset, order} = req;
            const data = await this.servicio.findall(filter, limit, offset, order);
            res.send(data);
        }
        catch(exc){
            console.error(exc)
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }

    create = async (req, res) => {
        try {
            const { body } = req;
            const data = await this.servicio.create(
                body.idCurso,
                body.idEstudiante, 
                body.idInscripcionEstado, 
                1
            ); return res.status(201).send(data);

        } catch (error) {
            console.error("Error en el controlador (create):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    update = async (req, res) => {
        try {
            const { body } = req;
            const idInscripcion = req.params.idInscripcion;
            const data = await this.servicio.update(idInscripcion,
                body.idCurso,
                body.idEstudiante,
                body.fechaHoraInscripcion,
                body.idInscripcionEstado, 
                1,
            );
            res.send(data);
        }
        catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    delete = async (req, res) => {
        try{
            const inscripcionId = req.params.inscripcionIdId;
            if(!inscripcionId) {
                res.status(400).send({ status: "Fallo", data: { error: "El parámetro estudianteId no puede ser vacío." } });
            }
            const data = await this.servicio.delete(parseInt(inscripcionId),1);
            res.send(data);
        } catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default InscripcionesController;
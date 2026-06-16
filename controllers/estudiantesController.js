import EstudianteService from "../services/estudiante.service.js";

class EstudiantesController {
    constructor() {
        this.servicio = new EstudianteService();
    }

    findAll = async (req, res) => {
        try {
            const { filter, limit, offset, order } = req;
            const data = await this.servicio.findall(filter, limit, offset, order);
            res.send(data);
        }
        catch (exc) {
            console.error(exc)
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        }
    }

    create = async (req, res) => {
        try {
            const { body } = req;
            const data = await this.servicio.create(
                body.documento,
                body.apellido,
                body.nombres,
                body.email,
                body.fechaNacimiento,
                body.activo,
                req.user.userid
            ); 
            return res.status(201).send(data);

        } catch (error) {
            console.error("Error en el controlador (create):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    update = async (req, res) => {
        try {

            const { body } = req;
            const estudianteId = req.params.estudianteId;
            const data = await this.servicio.update(estudianteId,
                body.documento,
                body.apellido,
                body.nombres,
                body.email,
                body.fechaNacimiento,
                body.activo,
                req.user.userid
            );

            res.send(data);
        }
        catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    delete = async (req, res) => {
        try {
            const estudianteId = req.params.estudianteId;
            if (!estudianteId) {
                res.status(400).send({ status: "Fallo", data: { error: "El parámetro estudianteId no puede ser vacío." } });
            }
            const data = await this.servicio.delete(parseInt(estudianteId), req.user.userid);
            res.send(data);
        } catch (error) {
            console.error("Error en el controlador (update):", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

export default EstudiantesController;